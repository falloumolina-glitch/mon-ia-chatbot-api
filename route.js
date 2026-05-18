import db from "./db.json" assert { type: "json" };

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ reply: "Message manquant" });
    }

    const msg = message.toLowerCase().trim();

    // 🧠 1. RECHERCHE EXACTE / PARTIELLE
    for (let item of db) {
      for (let key of item.keys) {
        const k = key.toLowerCase();

        if (msg.includes(k) || k.includes(msg)) {
          return Response.json({ reply: item.answer });
        }
      }
    }

    // 🧠 2. MOTS GÉNÉRAUX (fallback intelligent)
    if (msg.includes("qui") || msg.includes("quoi") || msg.includes("comment")) {
      return Response.json({
        reply: "🤖 Peux-tu préciser ta question ? Je vais t’aider."
      });
    }

    if (msg.includes("bonjour") || msg.includes("salut")) {
      return Response.json({
        reply: "👋 Bonjour ! Comment puis-je t’aider ?"
      });
    }

    if (msg.includes("merci")) {
      return Response.json({
        reply: "😊 Avec plaisir !"
      });
    }

    // 🧠 3. FALLBACK INTELLIGENT
    const fallback = [
      "🤔 Je ne suis pas sûr de comprendre, peux-tu reformuler ?",
      "Je n’ai pas encore appris ça 📚",
      "Peux-tu préciser ta question ? 🤖",
      "Je vais m’améliorer avec le temps 👍"
    ];

    return Response.json({
      reply: fallback[Math.floor(Math.random() * fallback.length)]
    });

  } catch (error) {
    return Response.json({
      reply: "Erreur serveur ❌",
      details: error.message
    });
  }
}
