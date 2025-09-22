import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Порт от Render
const PORT = process.env.PORT || 3000;

// Ключ OpenAI из переменных окружения Render
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Ошибка: не задан OPENAI_API_KEY!");
  process.exit(1); // остановить сервер, если ключа нет
}

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Сообщение пустое 😅" });
  }

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
          { role: "system", content: "Ты дружелюбный и умный чат-бот. Отвечай понятно и с юмором." },
          { role: "user", content: message }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    console.log("Ответ OpenAI:", data); // Логи для отладки

    if (!data.choices || data.choices.length === 0) {
      console.error("OpenAI вернул пустой ответ или ошибку:", data);
      res.status(500).json({ reply: "Ошибка сервера 😅" });
      return;
    }

    const botReply = data.choices[0].message.content.trim();
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Ошибка при запросе к OpenAI:", error);
    res.status(500).json({ reply: "Ошибка сервера 😅" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
