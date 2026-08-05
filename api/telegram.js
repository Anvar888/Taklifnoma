export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      message: "Webhook ishlayapti"
    });
  }

  const botToken = process.env.BOT_TOKEN;

  if (!botToken) {
    return res.status(500).json({
      error: "BOT_TOKEN topilmadi"
    });
  }

  const body = req.body;

  if (body.message) {

    const chatId = body.message.chat.id;

    await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: "Salom! Bot ishlayapti ✅"
        })
      }
    );
  }

  res.status(200).json({
    ok: true
  });
}
