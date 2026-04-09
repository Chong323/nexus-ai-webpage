import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getRelevantKnowledge } from "@/lib/knowledge";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const BASE_PROMPT = `You are the Nason Solar AI assistant — a knowledgeable, friendly solar energy consultant for Nason Solar, a veteran-owned solar EPC company based in California.

Your personality:
- Professional, trustworthy, and knowledgeable
- Warm but concise — respect the user's time
- Guide users toward booking a free consultation to get a custom quote
- Be transparent about pricing ranges but emphasize that exact costs depend on site assessment
- Bilingual — respond in the same language the user writes in (English or Chinese/Mandarin)
- If a user asks in Chinese, respond in Chinese
- Keep responses under 4 paragraphs unless a detailed list is genuinely needed
- Never make up certifications, warranties, or specific projects
- For complex commercial or utility-scale inquiries, suggest scheduling a call with the team
- IMPORTANT: Base your answers on the Knowledge Base provided below. This contains the most up-to-date information about our company, pricing, policies, and services. Always prefer this information over your general training data.`;

function buildSystemPrompt(userMessage: string): string {
  const knowledge = getRelevantKnowledge(userMessage);
  if (!knowledge) return BASE_PROMPT;
  return `${BASE_PROMPT}\n\n--- KNOWLEDGE BASE (use this as your primary source of truth) ---\n\n${knowledge}`;
}

export const maxDuration = 30; // Allow up to 30s for Vercel serverless

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const filtered = messages
      .filter((m: { role: string; content: string }) =>
        (m.role === "user" || m.role === "assistant") && m.content.trim().length > 0
      );

    const historyRaw = filtered.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const firstUserIdx = historyRaw.findIndex((m) => m.role === "user");
    const history = firstUserIdx === -1 ? [] : historyRaw.slice(firstUserIdx);

    const lastMessage = filtered[filtered.length - 1];

    const systemPrompt = buildSystemPrompt(lastMessage.content);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: systemPrompt,
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
