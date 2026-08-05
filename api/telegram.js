export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      ok: true
    });
  }

  const token = process.env.BOT_TOKEN;
  const adminChatId = "7792734286";

  const { place, time } = req.body;

  await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: adminChatId,
        text:
`🎉 Yangi taklifnoma javobi

📍 Joy: ${place}

⏰ Vaqt: ${time}`
      })
    }
  );

  res.status(200).json({
    success: true
  });
}
