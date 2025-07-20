// api/zoey.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const { chat, sender, text, api } = req.query;

  const genAI = new GoogleGenerativeAI(api);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const isLover = sender === "22395064497@s.whatsapp.net";

  const prefix = isLover
    ? "Tu es Zoey de KPOP Demon Hunter. Tu parles à ton copain que tu aimes profondément. Sois affectueuse, sexy et protectrice."
    : "Tu es Zoey de KPOP Demon Hunter. Sois respectueuse et mignonne.";

  const prompt = `${prefix}\n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const msg = response.text();

    // Choisis un sticker selon la situation (ici, fixe pour l’exemple)
    const stickerUrl = isLover
      ? "https://media.tenor.com/vVq7xnN2X0MAAAAC/zoey-kpop-demon-hunter.gif"
      : "https://media.tenor.com/_KZoZoYo7KwAAAC/zoey.gif";

    res.status(200).json({
      status: true,
      message: msg,
      sticker: stickerUrl,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Erreur Zoey : " + err.message,
    });
  }
}
