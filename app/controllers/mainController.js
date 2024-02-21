



const router = require('express').Router();
const fetch = require('node-fetch');

const User = require('../models/user');       


const mainController = {

    homePage: async (req, res, next) => {


        console.log("ca marche!!")


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


        console.log("Le controller login est déclenché a titre indicatif")


        res.render("login", {})
    },

//Réception d’un pseudo, d’un email et un password, vérification que le pseudo n’existe pas déjà en base de données, création d’un nouvel utilisateur si le pseudo est bien unique

   
//Livraison d’une page affichant un formulaire de d’inscription à un compte utilisateur
    getSignupPage: async (req, res, next) => {


        console.log("Le controller getsignup  est déclenché ")


        res.render("signup", {})
    },

    tryToLogin: async (req, res, next) => {
    const { pseudo, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ pseudo });

        if (!user) {
            // User not found
            console.log("User not found");
            return res.render('login', { error: 'Invalid credentials' });
        }

        // Check if the entered password matches the stored hashed password
        if (user.password === password) {
            // Passwords match, user is authenticated
            console.log("User authenticated");
            // You may want to set up a session or generate a token for the user here
            return res.render('cityResults', { user });
        } else {
            // Incorrect password
            console.log("Incorrect password");
            return res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
},


    getaboutus: async (req, res, next) => {


        console.log("Le controller aboutus  est déclenché ")


        res.render("aboutUs", {})
    },


    getcgu: async (req, res, next) => {


        console.log("Le controller aboutus  est déclenché ")


        res.render("cgu", {})
    },

    getfaq: async (req, res, next) => {


        console.log("Le controller aboutus  est déclenché ")


        res.render("faq", {})
    },












    postSignup: async (req, res, next) => {
        const { pseudo, email, password } = req.body;
    
        console.log("Données reçues du formulaire:", { pseudo, email, password });

        // Save user data to MongoDB
        try {
          const newUser = new User({
            pseudo,
            email,
            password, // You should hash the password before saving it in a real-world scenario
          });
          await newUser.save();
          console.log("User information saved to MongoDB:", {
            pseudo,
            email,
            password,
        });
          // Redirect or send a response indicating success
          res.redirect('/login');
        } catch (error) {
          // Handle the error, e.g., render an error page
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },


      




}

module.exports = mainController;
