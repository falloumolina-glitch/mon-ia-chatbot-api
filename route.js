import db from "./db.json" assert { type: "json" };

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message manquant" }, { status: 400 });
    }

    const msg = message.toLowerCase();

    // 🧠 1. CHECK DANS db.json AVANT OPENAI
    for (let item of db) {
      for (let key of item.keys) {
        if (msg.includes(key.toLowerCase())) {
          return Response.json({
            reply: item.answer
          });
        }
      }
    }

    // 🤖 2. SI PAS TROUVÉ → OPENAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es une IA utile." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "Erreur IA",
    });

  } catch (error) {
    return Response.json(
      { error: "Erreur serveur", details: error.message },
      { status: 500 }
    );
  }
                           }
