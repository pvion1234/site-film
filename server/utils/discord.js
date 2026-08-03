const axios = require('axios');

const sendDiscordNotification = async (message) => {
  try {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, {
      content: message,
    });
    console.log('Notification Discord envoyée :', message);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la notification Discord :', error.message);
  }
};

module.exports = sendDiscordNotification;