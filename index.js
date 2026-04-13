const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// API chat
app.post("/api/chat", (req, res) => {
  const message = req.body.message || "";
  const msg = message.toLowerCase();

  if (msg.includes("bonjour") || msg.includes("salut")) {
    return res.json({ reply: "Bonjour 👋 je suis ton IA intelligente" });
  }

  if (msg.includes("poésie")) {
    return res.json({ reply: "🌙 La poésie est l’art de transformer les émotions en mots ✨" });
  }

  if (msg.includes("sport")) {
    return res.json({ reply: "⚽ Le sport développe le corps et l’esprit" });
  }

  if (msg.includes("merci")) {
    return res.json({ reply: "Avec plaisir 😊" });
  }

  return res.json({ reply: "Je ne comprends pas encore 🤔" });
});

// test serveur
app.get("/api/healthz", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("IA Server running on port", PORT);
});
