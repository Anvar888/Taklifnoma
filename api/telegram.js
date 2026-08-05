export default async function handler(req, res) {

  const token = process.env.BOT_TOKEN;

  const adminChatId = "7792734286";

  try {
    await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: adminChatId,
          text: "🎉 Ajoyib taklifnoma yaratildi!"
        })
      }
    );

    res.status(200).json({
      ok: true
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
