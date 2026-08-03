const cron = require('node-cron');
const Event = require('../models/Events');
const sendDiscordNotification = require('../utils/discord');

const startEventChecker = () => {
  cron.schedule('* * * * *', async () => {
    console.log('Vérification des événements...');

    const maintenant = new Date();

    try {
      const eventsNonNotifies = await Event.find({
        notificationEnvoyee: false,
      }).populate('film');

      for (const event of eventsNonNotifies) {
        const dateEvent = new Date(event.date);
        const [heures, minutes] = event.heure.split(':');
        dateEvent.setHours(parseInt(heures), parseInt(minutes), 0, 0);

        if (dateEvent <= maintenant) {
          const message = `🎬 Rappel : "${event.film.title}" à regarder aujourd'hui à ${event.heure} !`;
          await sendDiscordNotification(message);

          event.notificationEnvoyee = true;
          await event.save();
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des événements :', error);
    }
  });
};

module.exports = startEventChecker;