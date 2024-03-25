// variables environnement
require('dotenv').config();


const express = require('express');
const app = express();
//app.use(express.urlencoded({ extended: true }))
const session = require('express-session');


app.use(
  session({
    secret: '2012keyboardcat66775544',
    resave: true,
    saveUninitialized: true,
  })
);



// determine les assets et dossier statiques
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});




// mise en place des routes et des controllers
const router = require('./app/router');
app.use(router);

// ecoute de l'app sur un port
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`App Meteose is running or PORT ${PORT}`);
})





