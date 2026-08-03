const cron = require('node-cron');
const Event = require('../models/Events');
const sendTelegramNotification = require('../utils/telegram');

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
    
        const heureRappel = new Date(dateEvent.getTime() - 60 * 60 * 1000);

        if (heureRappel <= maintenant) {
          const message = `🎬 Reminder: "${event.film.title}" to watch at ${event.heure} (in 1 hour)!`;
          await sendTelegramNotification(message);

          event.notificationEnvoyee = true;
          await event.save();
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des événements :', error);
    }
  });
};

const nettoyerEvenementsPasses = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Nettoyage des événements passés...');

    const maintenant = new Date();
    const seuil24h = new Date(maintenant.getTime() - 24 * 60 * 60 * 1000);

    try {
      const evenements = await Event.find();

      for (const event of evenements) {
        const dateEvent = new Date(event.date);
        const [heures, minutes] = event.heure.split(':');
        dateEvent.setHours(parseInt(heures), parseInt(minutes), 0, 0);

        if (dateEvent <= seuil24h) {
          await Event.findByIdAndDelete(event._id);
          console.log(`Événement supprimé : ${event._id}`);
        }
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage des événements :', error);
    }
  });
};

module.exports = { startEventChecker, nettoyerEvenementsPasses };