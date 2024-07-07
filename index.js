
require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
//const helmet = require('helmet');
const path = require('path');

const rateLimit = require('express-rate-limit');







app.use(
  session({
    secret: '2012keyboardcat66775544',
    resave: true,
    saveUninitialized: true,
  })
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limite chaque IP à 5 requêtes par fenêtre de 15 minutes
  message: 'Trop de tentatives de connexion à partir de cette adresse IP. Veuillez réessayer après 15 minutes.',
  headers: true,
});


/*    CA NE FONCTIONNE PAS BIEN MAIS ON GARDE CETTE STRUCTURE AU CAS OU;;;
  
app.use(function(req, res, next) {

  res.setHeader("Content-Security-Policy", 
    `default-src 'self'; ` +
    `font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; ` +
    `style-src 'self' https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/ https://fonts.googleapis.com; ` +
    `script-src 'self' 'unsafe-inline' https://unpkg.com/@h0rn0chse/night-sky/dist/bundle.min.js https://unpkg.com/feather-icons; ` +
    `connect-src 'self' https://api.nasa.gov; ` +
  );
  next();
});
*/


// determine les assets et dossier statiques
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/app/views');
app.set('views', path.join(__dirname, 'app', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');  // on ne veut pas que express puisse apparaitre en clair  Reduce fingerprinting


const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.get('/sitemap.xml', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'sitemap.xml');
  res.sendFile(filePath);
});

// mise en place des routes et des controllers
const router = require('./app/router');
app.use(router);

// ecoute de l'app sur un port
const PORT = process.env.PORT || 3017;
app.listen(PORT, () => {
    console.log(`App Meteose is running or PORT ${PORT}`);
})





