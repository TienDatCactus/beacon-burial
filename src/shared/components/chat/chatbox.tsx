"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessagesSquare, X, MinusSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // We'll show the welcome message in the UI but not include it in the API history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Xin chào! Tôi là trợ lý AI của Thiên An Lạc, công ty cung cấp dịch vụ tang lễ chuyên nghiệp. Tôi có thể tư vấn cho bạn về các dịch vụ tang lễ, nghi thức truyền thống, hoặc giải đáp thắc mắc của bạn về chi phí và quy trình. Tôi có thể giúp gì cho bạn hôm nay?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare chat history for the API
      // Filter out the welcome message (id: "welcome") to comply with Gemini API requirements
      const historyForApi = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => {
          // In the UI we use 'assistant', but for Gemini API we need to use 'model'
          const apiRole = msg.role === "assistant" ? "model" : msg.role;
          return {
            content: msg.content,
            role: apiRole,
          };
        });

      // Call our chat API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: historyForApi,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Add bot response to messages
      // For UI purposes, we continue to use 'assistant' role
      const botResponse: Message = {
        id: `assistant-${Date.now()}`,
        content: data.response || "Không nhận được phản hồi hợp lệ từ máy chủ.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: "Xin lỗi, đã xảy ra lỗi khi xử lý tin nhắn của bạn.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full h-12 w-12 shadow-lg bg-primary hover:bg-primary/90 text-white p-3"
          aria-label="Chat with support"
        >
          <MessagesSquare className="size-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={cn(
            "bg-white rounded-lg shadow-xl flex flex-col mb-2 border border-gray-200 w-80 transition-all duration-300 ease-in-out mt-4",
            isMinimized ? "h-14" : "h-96"
          )}
        >
          {/* Chat header */}
          <div className="p-3 bg-primary text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Tư vấn dịch vụ tang lễ</h3>
            <div className="flex space-x-1">
              <Button
                onClick={minimizeChat}
                className="text-white/80 hover:text-white focus:outline-none"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                <MinusSquare size={18} />
              </Button>
              <Button
                onClick={toggleChat}
                className="text-white/80 hover:text-white focus:outline-none"
                aria-label="Close chat"
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          {/* Chat content */}
          {!isMinimized && (
            <>
              {/* Messages area */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "max-w-[85%] p-3 rounded-lg break-words",
                      msg.role === "user"
                        ? "bg-primary/10 ml-auto rounded-tr-none"
                        : "bg-gray-100 mr-auto rounded-tl-none"
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {`${msg.timestamp
                        .getHours()
                        .toString()
                        .padStart(2, "0")}:${msg.timestamp
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}
                    </p>
                  </div>
                ))}
                {isLoading && (
                  <div className="bg-gray-100 max-w-[85%] p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1 items-center *:transition-all *:duration-300 *:ease-in-out">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-3 border-t flex gap-2">
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi về dịch vụ tang lễ..."
                  className="resize-none min-h-10 text-sm"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  className="h-10 w-10 p-0"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbox;
