"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { TMessage } from "@/types/chatMessage";
import { ArrowLeft, Bot, Send, User } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBot() {
  const [history, setHistory] = useState<TMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", text: input };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput("");
    setLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory }),
      });
      const { answer } = await res.json();

      setHistory((h) => [...h, { role: "bot", text: answer }]);
    } catch (error) {
      console.error("Error:", error);
      setHistory((h) => [
        ...h,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  return (
    <div className="my-10 py-10 px-4 md:px-16 border rounded relative overflow-clip">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="flex justify-center">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">SajibBot</h1>
            <p className="text-muted-foreground">
              Ask me anything about Sajib&apos;s experience and projects
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border relative overflow-hidden">
          <BorderBeam duration={40} size={300} />

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-6">
            {history.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full mb-4">
                  <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Welcome to SajibBot!
                </h3>
                <p className="text-muted-foreground max-w-md">
                  I&apos;m here to help you learn about Sajib&apos;s background, skills,
                  and projects. Feel free to ask me anything!
                </p>
              </div>
            )}

            {history.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "bot" && (
                  <Avatar className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white ml-auto"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>

                {message.role === "user" && (
                  <Avatar className="h-8 w-8 bg-gray-100 dark:bg-gray-700">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      SajibBot is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t bg-gray-50 dark:bg-gray-800/50 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something about Sajib..."
                  className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-12 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px] max-h-[200px]"
                  rows={1}
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="sm"
                className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </div>
          </div>
        </div>
      </div>

      {/* border beam */}
      <BorderBeam duration={40} size={300} />
    </div>
  );
}
