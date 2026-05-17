"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userText = message;
    setChat([...chat, { role: "user", text: userText }]);
    setMessage("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      { role: "ai", text: data.reply },
    ]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat IA</h2>

      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: 10 }}>
        {chat.map((c, i) => (
          <p key={i}>
            <b>{c.role === "user" ? "Toi" : "IA"}:</b> {c.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écris..."
      />

      <button onClick={sendMessage}>
        Envoyer
      </button>
    </div>
  );
  }
