export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(200).json({
        message: "Webhook ishlayapti"
      });
    }

    const token = process.env.BOT_TOKEN;

    if (!token) {
      throw new Error("BOT_TOKEN topilmadi");
    }

    const update = req.body;

    if (update.message) {

      const chatId = update.message.chat.id;

      await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
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

    return res.status(200).json({
      ok:true
    });

  } catch(error) {

    console.log(error);

    return res.status(200).json({
      error: error.message
    });
  }
}
