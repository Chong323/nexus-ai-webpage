"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Minimize2,
  Maximize2,
  Sun,
} from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5" />
      </div>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Init greeting from translations
  useEffect(() => {
    setMessages([{ role: "assistant", content: t("chat.greeting") }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const suggested = [
    t("chat.suggested1"),
    t("chat.suggested2"),
    t("chat.suggested3"),
    t("chat.suggested4"),
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setStreaming(true);

      const maxRetries = 2;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: newMessages }),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const reader = res.body?.getReader();
          if (!reader) throw new Error("No response body");

          const decoder = new TextDecoder();
          let assistantContent = "";

          setMessages((prev) => {
            // Remove any prior empty assistant message from a failed retry
            const cleaned = prev.filter(
              (m, i) => !(i === prev.length - 1 && m.role === "assistant" && m.content === "")
            );
            return [...cleaned, { role: "assistant", content: "" }];
          });

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") break;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.text) {
                    assistantContent += parsed.text;
                    setMessages((prev) => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        role: "assistant",
                        content: assistantContent,
                      };
                      return updated;
                    });
                  }
                } catch {
                  // skip malformed JSON
                }
              }
            }
          }

          // Success — break out of retry loop
          break;
        } catch (err) {
          console.error(`Chat error (attempt ${attempt + 1}):`, err);
          if (attempt < maxRetries) {
            // Wait briefly before retrying
            await new Promise((r) => setTimeout(r, 800));
            continue;
          }
          // All retries exhausted
          setMessages((prev) => {
            const cleaned = prev.filter(
              (m, i) => !(i === prev.length - 1 && m.role === "assistant" && m.content === "")
            );
            return [
              ...cleaned,
              {
                role: "assistant",
                content: t("chat.error"),
              },
            ];
          });
        }
      }

      setStreaming(false);
      textareaRef.current?.focus();
    },
    [messages, streaming, t]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg glow flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`fixed z-50 bottom-6 right-6 bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              expanded
                ? "w-[min(600px,calc(100vw-3rem))] h-[min(700px,calc(100vh-3rem))]"
                : "w-[min(380px,calc(100vw-3rem))] h-[520px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t("chat.title")}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    {t("chat.subtitle")}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
                  aria-label={expanded ? "Minimize" : "Expand"}
                >
                  {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <ChatMessage key={i} msg={msg} />
              ))}
              {streaming && messages[messages.length - 1]?.content === "" && (
                <TypingIndicator />
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0">
                {suggested.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex-shrink-0">
              <div className="flex gap-2 items-end">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("chat.placeholder")}
                  className="resize-none min-h-[40px] max-h-[120px] text-sm rounded-xl bg-muted/30"
                  rows={1}
                  disabled={streaming}
                />
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-xl flex-shrink-0 bg-primary text-primary-foreground"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || streaming}
                  aria-label="Send"
                >
                  {streaming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                {t("chat.enterToSend")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
