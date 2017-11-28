//const adminController = require("./adminController")
const firebase = require("firebase")
const observer = require("./observer")
const admin = require("firebase-admin")
const serviceAccount = require("../private/serviceAccountKey.json")


var config = {
    apiKey: "AIzaSyDCcUjGA2Aucemv8DdP4HDz8a6bVYCXenE",
    authDomain: "personal-site-60774.firebaseapp.com",
    databaseURL: "https://personal-site-60774.firebaseio.com",
    projectId: "personal-site-60774",
    storageBucket: "personal-site-60774.appspot.com",
    messagingSenderId: "674756866097"
};


const auth = Object.create(null, {
    "activeUser": {
        value: null,
        writable: true
    },
    "init": {
        value: function () {
            firebase.initializeApp(config)
            
            // add listener to the login button
            document.getElementById("adminLoginBtn").addEventListener("click", e => {
                // Validate login information
                this.validate(
                    document.querySelector("[name='adminLoginEmail']").value,
                    document.querySelector("[name='adminLoginPassword']").value
                )
                
                // Clear the form
                document.querySelector("[name='adminLoginEmail']").value = ""
                document.querySelector("[name='adminLoginPassword']").value = ""
            })

            // add listener to the logout button
            document.getElementById("adminLogoutBtn").addEventListener("click", (event) => {
                
                this.logout()
        
                // clear out contents of the admin form DOM element
                document.getElementById("blogEntry").innerHTML = ""
        
                // display the login form
                document.getElementById("adminLogin").classList.remove("hidden")
                // hide the logout button
                document.getElementById("adminLogoutBtn").classList.add("hidden")
            })

            // Set up authentication observer
            observer.init(this)
        }
    },
    "validate": {
        value: function (email, password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    console.log("Email or password is invalid")
                })
        }
    },
    "getToken": {
        value: function () {
            
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                console.log("idToken", idToken)
                auth.activeUser.idToken = idToken
                // Send token to your backend via HTTPS
                // ...
                // admin.auth().verifyIdToken(idToken)
                //     .then(function(decodedToken) {
                //         console.log(decodedToken)
                //         auth.activeUser.decodedToken = decodedToken.uid;
                //         // ...
                //     }).catch(function(error) {
                //         // Handle error
                //         console.log("error verifying token")
                //     });
            }).catch(function(error) {
                // Handle error
                console.log("error getting idToken")
            });
        }
    },
    "adminSDKInit": {
        value: function () {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://personal-site-60774.firebaseio.com"
            });
        }
    },
    "logout": {
        value: function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
            });
        }
    }
})

module.exports = auth

