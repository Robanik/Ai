// dann.js
// URL сервера, где развернут server.js
const SERVER_URL = "https://твой-сервер/render/chat";

async function getBotResponse(message) {
  try {
    const response = await fetch(SERVER_URL, {
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
