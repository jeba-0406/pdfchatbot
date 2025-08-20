"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Sparkles } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";

export default function Ai() {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const { messages, addMessage } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const handleSend = () => {
        if (!message.trim()) return;
        addMessage({ id: Date.now(), text: message, sender: "me" });
        setIsTyping(true);
        setTimeout(() => {
            const aiMessage = `AI Response to: "${message}"`;
            addMessage({ id: Date.now() + 1, text: aiMessage, sender: "ai" });
            setIsTyping(false);
        }, 2000);
        setMessage("");
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);
    return (
        <div className="text-black bg-white w-full min-h-screen flex flex-col rounded-2xl">
            <div className="flex justify-center flex-col items-center gap-1 py-4">
                <Sparkles color="#000000" />
                <p className="font-medium">Ask our AI anything</p>
            </div>
            <div className="flex-1 w-full max-w-3xl mx-auto px-3 sm:px-6 flex flex-col gap-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-[85%] text-[13px] sm:max-w-md ${msg.sender === "me"
                                ? "bg-gray-200 text-black"
                                : "bg-pink-100 text-black"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-2xl bg-pink-100 text-black flex space-x-1">
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
            <div className="sticky bottom-0 flex justify-center px-3 sm:px-6 pb-4">
                <div className="flex items-center w-full max-w-3xl bg-gray-100 rounded-2xl shadow-sm px-3 py-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me anything about your projects"
                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isTyping && message.trim()) {
                              handleSend();
                            }
                          }}
                          
                    />
                    <button
                        disabled={!message.trim() || isTyping}
                        onClick={handleSend}
                        className={`p-2 rounded-lg transition-colors ${(!message.trim() || isTyping)
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-400 hover:bg-gray-500 text-white"
                            }`}
                    >
                        <Send size={18} />
                    </button>

                </div>
            </div>
        </div>
    );
}
