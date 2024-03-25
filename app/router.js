

// init de Express et du router
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config()

const mainController = require('./controllers/mainController');

router.use(express.json());

router.get('/', mainController.homePage);
router.get('/login', mainController.getLoginPage);
router.get('/signup', mainController.getSignupPage);
router.get('/cityResults', mainController.getCityresultpage);
router.get('/aboutUs', mainController.getaboutus);
router.get('/faq', mainController.getfaq);
router.get('/pagesecrete', mainController.getSecretpage);
router.get('/nasa', mainController.getNasapage);
router.get('/index2', mainController.getindex2page);
router.get('/forbidden', mainController.getforbiddenpage);

router.get('/logout', mainController.getLogout);

router.post('/signup', mainController.postSignup); 
router.post('/login', mainController.tryToLogin);



/*router.get('/', (req, res) => {
  res.render('home', {
    city: null,
    des: null,
    icon: null,
    temp: null
  });
});*/

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=minutely&units=metric&lang=fr&appid=${process.env.API_KEY}`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Ville inconnu au bataillon') {
          res.render('index', {
            city: data.message,
            des: null,
            temp: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const temp = data.main.temp;

          res.render('cityResults', {
            city, des, temp
          });
          console.log(data);
        }
      });

  } catch (err) {
    console.error("Error fetching weather data:", err);

    res.render('cityResults', {
      city: 'Ville inconnu au bataillon!',
      des: null,
      temp: null
    })
  }

})





module.exports = router;
