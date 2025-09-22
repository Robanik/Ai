// server.js
const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const OPENAI_API_KEY = "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"; // вставь свой ключ

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Ты дружелюбный чат-бот, отвечай понятно и с юмором." },
          { role: "user", content: message }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content.trim();
    res.json({ reply: botReply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Ошибка сервера 😅" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
