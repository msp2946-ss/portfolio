"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Minus, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setMessages([...newMessages, { role: "assistant", content: `❌ ${errText}` }]);
        return;
      }

      const data = await res.json();
      if (data.error) {
        setMessages([...newMessages, { role: "assistant", content: `❌ ${data.error}` }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "❌ Error getting response" }]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  const closeChat = () => {
    setIsOpen(false);
    setMessages([]); // Clear history on close
  };

  const minimizeChat = () => {
    setIsMinimized(true); // Keep history
  };

  return (
    <>
      {/* Floating button (mobile only when closed) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-5 right-5 bg-brand-500 text-white p-3 rounded-full shadow-lg hover:bg-brand-600 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat box */}
      {(!isMobile || isOpen) && !isMinimized && (
        <div className="fixed bottom-5 right-5 w-80 md:w-96 bg-bg border border-border rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-500 text-white px-4 py-2">
            <span>Assistant</span>
            <div className="flex gap-2">
              <button onClick={minimizeChat} aria-label="Minimize"><Minus size={18} /></button>
              <button onClick={closeChat} aria-label="Close"><X size={18} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3 max-h-96">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] prose prose-invert ${
                  m.role === "user"
                    ? "bg-brand-100 text-brand-900 ml-auto"
                    : "bg-gray-700 text-white"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, className, children, ...props }) {
                      const codeText = String(children).replace(/\n$/, "");
                      // react-markdown v8+ uses node.type === 'inlineCode' for inline code
                      if (node && (node as any).type === 'inlineCode') {
                        return <code className="bg-gray-800 p-1 rounded">{children}</code>;
                      }
                      return (
                        <div className="relative group">
                          <pre className="bg-gray-900 p-3 rounded overflow-x-auto">
                            <code {...props} className={className}>
                              {codeText}
                            </code>
                          </pre>
                          <button
                            onClick={() => copyToClipboard(codeText)}
                            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 p-1 rounded text-xs flex items-center gap-1"
                          >
                            <Copy size={14} />
                            {copied === codeText ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      );
                    },
                  }}
                >
                  {m.content}
                </ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="p-2 bg-gray-700 text-white rounded-lg">Typing…</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex border-t border-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-brand-500 px-4 text-white hover:bg-brand-600 transition"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Minimized button */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-5 right-5 bg-brand-500 text-white p-3 rounded-full shadow-lg hover:bg-brand-600 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </>
  );
}
