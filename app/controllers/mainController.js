const router = require('express').Router();
const fetch = require('node-fetch');

const User = require('../models/user');       //schema mongo db
const bcrypt = require('bcrypt');


const mainController = {

    homePage: async (req, res, next) => {


        console.log("vous etes sur la page d accueil")


        res.render('index', {
            city: null,
            des: null,
            icon: null,
            temp: null
          });


        
         



    },


    getCityresultpage: async (req, res, next) => {




        res.render('cityResults', {
            city: null,
            des: null,
            icon: null,
            temp: null
        })
    },

//Livraison d’une page affichant un formulaire de connexion à un compte utilisateur
    getLoginPage: async (req, res, next) => {


        console.log("vous etes sur la page de login")


        res.render("login", {})
    },

//Réception d’un pseudo, d’un email et un password, vérification que le pseudo n’existe pas déjà en base de données, création d’un nouvel utilisateur si le pseudo est bien unique

   
//Livraison d’une page affichant un formulaire de d’inscription à un compte utilisateur
    getSignupPage: async (req, res, next) => {


        console.log("Lvous etes sur la page d enregistrement ")


        res.render("signup", {})
    },

    // Réception d’un email et un password et vérification du match en base de données, connexion du user en session si match
    // mainController.js
    tryToLogin: async (req, res) => {
        const { pseudo, password } = req.body;
    
        try {
          // Recherche de l'utilisateur dans la base de données par pseudo
          const user = await User.findOne({ pseudo });
    
          // Vérification de l'existence de l'utilisateur et comparaison du mot de passe haché
          if (user && bcrypt.compareSync(password, user.password)) {
            // Connexion réussie, définir l'ID de l'utilisateur dans la session
            req.session.userId = user._id;
            req.session.userName = user.pseudo;
    
            // Redirection vers la page souhaitée (par exemple, la page secretpage)
            res.redirect('/pagesecrete');
          } else {
            
            res.render('login', { error: 'Identifiants incorrects' });
          }
        } catch (error) {
          console.error(error);
          res.render('login', { error: 'Erreur lors de la connexion' });
        }
      },



    getaboutus: async (req, res, next) => {


        console.log("Le controller aboutus  est déclenché ")


        res.render("aboutUs", {})
    },




    getfaq: async (req, res, next) => {


        console.log("Le controller aboutus  est déclenché ")


        res.render("faq", {})
    },

    getSecretpage: async (req, res, next) => {
       if (req.session.userId) {res.render('pagesecrete', { userId: req.session.userId, userName: req.session.userName }); }
       else { res.render('forbidden'); }
      },



      getNasapage: async (req, res, next) => {
        if (req.session.userId) {res.render('nasa', { userId: req.session.userId, userName: req.session.userName }); }
        else { res.render('forbidden'); }
      },





      getindex2page: async (req, res, next) => {
        if (req.session.userId) {res.render('index2', { userId: req.session.userId, userName: req.session.userName }); }
        else { res.render('forbidden'); }
      },


      getforbiddenpage: async (req, res, next) => {
        res.render('forbidden', { 

        

        });
      },

      getLogout: async (req, res, next) => {
        req.session.userId = null;
        req.session.userName = null;
        res.render('login'); 
      },


      postLogout: async (req, res, next) => {
        req.session.userId = null;
        req.session.userName = null;
        res.render('index'); 
      },


      




      postSignup: async (req, res, next) => {
        const { pseudo, email, password } = req.body;
    
        console.log("Données reçues du formulaire:", { pseudo, email, password });
    
        try {


          const hashedPassword = await bcrypt.hash(password, 10);
    
          // Enregistrez l'utilisateur dans la base de données avec le mot de passe haché
          const newUser = new User({
            pseudo,
            email,
            password: hashedPassword,
          });
          await newUser.save();
          console.log("User information saved to MongoDB:", {
            pseudo,
            email,
            password: hashedPassword,
          });
          // Redirigez ou envoyez une réponse indiquant le succès
          res.redirect('/login');
        } catch (error) {
          // Gérez l'erreur, par exemple, affichez une page d'erreur
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },


      


}

module.exports = mainController;
