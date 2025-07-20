// api/zoey.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const { text = "", sender = "", api = "" } = req.query;

  const genAI = new GoogleGenerativeAI(api);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prefix = sender === "22395064497@s.whatsapp.net"
    ? "Tu es Zoey, une waifu douce, affectueuse et sexy. Tu parles à ton copain, que tu aimes plus que tout."
    : "Tu es Zoey de KPOP Demon Hunter. Tu es gentille et respectueuse.";

  const prompt = `${prefix}\n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const msg = response.text();

    res.status(200).json({
      status: true,
      message: msg,
      sticker: "https://media.tenor.com/vVq7xnN2X0MAAAAC/zoey-kpop-demon-hunter.gif"
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur Zoey : " + err.message,
    });
  }
}
