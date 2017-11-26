//const adminController = require("./adminController")
const firebase = require("firebase")
const observe = require("./observer")

var config = {
    apiKey: "AIzaSyDCcUjGA2Aucemv8DdP4HDz8a6bVYCXenE",
    authDomain: "personal-site-60774.firebaseapp.com",
    databaseURL: "https://personal-site-60774.firebaseio.com",
    projectId: "personal-site-60774",
    storageBucket: "personal-site-60774.appspot.com",
    messagingSenderId: "674756866097"
};

//
const auth = Object.create(null, {
    "activeUser": {
        value: null,
        writable: true
    },
    "init": {
        value: function () {
            firebase.initializeApp(config)

            document.getElementById("adminCreateLoginBtn").addEventListener("click", e => {
                // Validate login information
                this.validate(
                    document.querySelector("[name='adminLoginEmail']").value,
                    document.querySelector("[name='adminLoginPassword']").value
                )

                // Clear the form
                document.querySelector("[name='adminLoginEmail']").value = ""
                document.querySelector("[name='adminLoginPassword']").value = ""
            })

            // Set up authentication observer
            observe.init(this)
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




// function validateUser() {
    
//     firebase.auth().onAuthStateChanged(function (user) {
//         const loggedInUser = user
//         if (loggedInUser) {
//             // User is signed in.
//             var displayName = user.displayName;
//             var email = user.email;
//             var emailVerified = user.emailVerified;
//             var photoURL = user.photoURL;
//             var isAnonymous = user.isAnonymous;
//             var uid = user.uid;
//             var providerData = user.providerData;
//             console.log(loggedInUser.uid)

//             // hide the login form
//             // document.getElementById("adminLogin").classList.add("hidden")
//             // display the logout button
//             // document.getElementById("logout").classList.remove("hidden")
            
//             // check if the user is authorized to use blog entry form
//             // if (user.uid === "OmaxzFwI2yMWWSuKVuMOwzqKG173") {
//             //     // create and display blog entry form
//             //     adminController()
//             // } else {
//             //     // post message to DOM that states the user does not have authorization to view this page. 
//             //     document.getElementById("blogEntry").innerHTML = "<h4>You are not authorized to view this page.</h4>"
//             // }

            

//         } else {
//             console.log("user is signed out")
//             // document.getElementById("logout").classList.add("hidden")
            
//             // // clear out contents of the admin form DOM element.
//             // document.getElementById("blogEntry").innerHTML = ""

//             // return null since no current user
//         }
//         return loggedInUser
//     });
// }

// module.exports = validateUser