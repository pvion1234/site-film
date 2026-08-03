const axios = require('axios');

const sendTelegramNotification = async (message) => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    });
    console.log('Notification Telegram envoyée :', message);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification Telegram :', error.response?.data || error.message);
  }
};

module.exports = sendTelegramNotification;