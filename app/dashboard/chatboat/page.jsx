"use client";
import { useState, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages([
      ...newMessages,
      { role: "assistant", content: data.choices[0].message.content },
    ]);
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-gray-100">
      <div className="h-96 overflow-y-auto p-2 border-b bg-white rounded-md">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`p-2 rounded-md my-1 ${
              msg.role === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-gray-300 text-left"
            }`}
          >
            {msg.content}
          </p>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 p-2 border rounded-md focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
