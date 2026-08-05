export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { place, time } = req.body || {};
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    if (botToken && chatId) {
      const message = `💌 Yangi javob\n\n❤️ Xolidaxon taklifni qabul qildi.\n\n📍 Joy:\n${place}\n\n🕒 Vaqt:\n${time}\n\n📅 ${new Date().toLocaleString()}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return res.status(200).json({ success: true });
  }
}
