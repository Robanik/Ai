// dann.js
// Вставь сюда свой API ключ OpenAI
const apiKey = "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";

// Функция получения ответа от OpenAI
async function getBotResponse(message) {
  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Ты дружелюбный и умный чат-бот. Отвечай кратко, понятно и с юмором, если уместно." },
      { role: "user", content: message }
    ],
    max_tokens: 150
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    return result.choices[0].message.content.trim();
  } catch (error) {
    console.error("Ошибка OpenAI API:", error);
    return "Извини, произошла ошибка 😅";
  }
}
