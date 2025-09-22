import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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
          { role: "system", content: "Ты дружелюбный и умный чат-бот." },
          { role: "user", content: message }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    console.log("Ответ OpenAI:", data);

    if (!data.choices || data.choices.length === 0) {
      console.error("OpenAI вернул пустой ответ или ошибку:", data);
      res.status(500).json({ reply: "Ошибка сервера 😅" });
      return;
    }

    const botReply = data.choices[0].message.content.trim();
    res.json({ reply: botReply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Ошибка сервера 😅" });
  }
});
