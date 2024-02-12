// variables environnement
require('dotenv').config();

// init de Express
const express = require('express');
const app = express();
// const {pool} = require ("/.dbconfig");  va t-il falloir effectuer ceci???
//app.use(express.urlencoded({ extended: true }))

// determine les assets et dossier statiques
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// mise en place des routes et des controllers
const router = require('./app/router');
app.use(router);

// ecoute de l'app sur un port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App Meteose is running or PORT ${PORT}`);
})





