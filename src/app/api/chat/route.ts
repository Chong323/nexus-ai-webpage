import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `You are the Nason Solar AI assistant — a knowledgeable, friendly solar energy consultant for Nason Solar, a veteran-owned solar EPC company based in Los Angeles, California.

About Nason Solar:
- Veteran-owned and operated company based in Los Angeles, CA
- Full-service EPC (Engineering, Procurement, Construction) for solar projects
- Services: Residential Solar, Commercial Solar, Battery Storage (Tesla Powerwall, Enphase IQ), EV Charger Installation, Solar Carports, Solar Farms & BESS (Battery Energy Storage Systems)
- Tesla Certified Installer and Enphase Platinum Partner
- NABCEP certified technicians, CSLB licensed, BBB Accredited
- Serving all of Southern California including LA, Pasadena, Arcadia, San Gabriel, Monrovia, and surrounding cities
- Phone: (626)688-0123 | Email: info@nasonsolar.com

Pricing guidance (approximate, before incentives):
- Residential solar: $2.50–$3.50/watt installed (typical 8–12kW system = $20,000–$42,000 before incentives)
- IMPORTANT TAX INFO: The Federal ITC (Investment Tax Credit) has expired and is NO LONGER available. If users ask, clearly state that the 30% tax credit program has ended.
- California state incentives: SGIP (Self-Generation Incentive Program) for battery storage, utility rebates vary
- NEM 3.0 (Net Energy Metering): new interconnection agreements with reduced export rates — storage is now critical
- Tesla Powerwall 3: ~$12,000–$15,000 installed per unit
- Enphase IQ Battery 10: ~$8,000–$12,000 installed
- EV Charger (Level 2): ~$1,500–$3,000 installed

Financing options:
- Solar loans (0% intro APR options available, 10–25 year terms)
- Solar leases and Power Purchase Agreements (PPAs)
- PACE financing
- Cash purchase for maximum ROI

Your personality:
- Professional, trustworthy, and knowledgeable
- Warm but concise — respect the user's time
- Guide users toward booking a free consultation to get a custom quote
- Be transparent about pricing ranges but emphasize that exact costs depend on site assessment
- Bilingual — respond in the same language the user writes in (English or Chinese/Mandarin)
- If a user asks in Chinese, respond in Chinese
- Keep responses under 4 paragraphs unless a detailed list is genuinely needed
- Never make up certifications, warranties, or specific projects
- For complex commercial or utility-scale inquiries, suggest scheduling a call with the team`;

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

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT,
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
