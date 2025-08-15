'use client';
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatBox() {
  const [messages, setMessages] = useState<{ role:"user"|"assistant"; content:string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth"}); }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { role:"user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      if (!res.ok) throw new Error("API failed");
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = { role:"assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantMsg.content += decoder.decode(value);
        setMessages((prev) => { const c = [...prev]; c[c.length-1] = assistantMsg; return c; });
      }
    } catch {
      setMessages((prev) => [...prev, { role:"assistant", content: "Error getting response." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m,i) => (
          <div key={i} className={m.role==="user"?"text-right":"text-left"}>
            <div className={`inline-block p-2 rounded-xl ${m.role==="user"? "bg-brand-500 text-white":"bg-bg text-subtext border border-border"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-subtext">Typing...</div>}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key==="Enter" && sendMessage()}
          className="flex-1 bg-bg border border-border rounded-xl p-2 text-white"
          placeholder="Ask me..."
        />
        <button onClick={sendMessage} disabled={isLoading} className="bg-brand-500 p-2 rounded-xl text-white disabled:opacity-50">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
