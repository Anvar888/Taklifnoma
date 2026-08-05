export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      message: "Webhook ishlayapti"
    });
  }

  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "BOT_TOKEN topilmadi"
    });
  }

  const update = req.body;

  if (update.message) {

    const chatId = update.message.chat.id;
    const text = update.message.text;

    await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Siz yozdingiz: ${text}`
        })
      }
    );
  }

  res.status(200).json({
    ok: true
  });
}
