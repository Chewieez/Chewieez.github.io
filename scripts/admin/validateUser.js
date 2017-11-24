const adminController = require("./adminController")
const createLogin = require("./createLogin")
const loginAddListeners = require("./loginAddListeners")

function validateUser() {
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            
            // create and display login and logout form and buttons and hide login form
            createLogin()
            document.getElementById("adminLogin").classList.add("hidden")
            document.getElementById("logout").classList.remove("hidden")
            // create and display blog entry form
            adminController()
            
        } else {
            console.log("user is signed out")
            // create and display login form 
            createLogin()
            document.getElementById("logout").classList.add("hidden")
            
            // clear out contents of the admin form
            document.getElementById("blogEntry").innerHTML = ""
        }

        loginAddListeners()
    
    });

}

module.exports = validateUser