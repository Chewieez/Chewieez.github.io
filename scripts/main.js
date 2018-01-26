const addListenersNav = require("./addListenersNav")
const createLogin = require("./admin/createLogin")
// const loginAddListeners = require("./admin/loginAddListeners")
const auth = require("./admin/validateUser")

addListenersNav()
createLogin()
// loginAddListeners()
auth.init()


const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDCcUjGA2Aucemv8DdP4HDz8a6bVYCXenE",
    authDomain: "personal-site-60774.firebaseapp.com",
    databaseURL: "https://personal-site-60774.firebaseio.com",
    projectId: "personal-site-60774",
    storageBucket: "personal-site-60774.appspot.com",
    messagingSenderId: "674756866097"
}

firebase.initializeApp(FIREBASE_CONFIG)