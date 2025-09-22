// dann.js
async function getBotResponse(message) {
  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    return data.reply;

  } catch (error) {
    console.error("Ошибка:", error);
    return "Извини, произошла ошибка 😅";
  }
}
