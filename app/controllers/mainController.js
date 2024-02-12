
const router = require('express').Router();
const fetch = require('node-fetch');

        


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

    tryToRegister: async (req, res, next) => {


        console.log("Le controller trytoregister est déclenché ")


        res.render("signup", {})
    },
//Livraison d’une page affichant un formulaire de d’inscription à un compte utilisateur
    getSignupPage: async (req, res, next) => {


        console.log("Le controller getsignup  est déclenché ")


        res.render("signup", {})
    },

    // Réception d’un email et un password et vérification du match en base de données, connexion du user en session si match
    tryToLogin: async (req, res, next) => {


        console.log("Le controller trytologin est déclenché ")

// le user est connecté la page devra etre renommé home.ejs comme sur le cahier des charges
        res.render("home", {})
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


}

module.exports = mainController;