const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const filmsRouter = require('./routes/films');
const eventsRouter = require('./routes/events');
const { startEventChecker, nettoyerEvenementsPasses } = require('./cron/checkEvents');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur ton API de gestion de films !');
});

// Démarrer le serveur
app.use('/api/films', filmsRouter);
app.use('/api/events', eventsRouter);
const PORT = process.env.PORT || 5000;
startEventChecker();
nettoyerEvenementsPasses();
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});