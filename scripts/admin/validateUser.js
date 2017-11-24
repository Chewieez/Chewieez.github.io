const adminController = require("./adminController")


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
            console.log(uid)
            // hide the login form
            document.getElementById("adminLogin").classList.add("hidden")
            // display the logout button
            document.getElementById("logout").classList.remove("hidden")
            
            // check if the user is authorized to use blog entry form
            if (user.uid === "OmaxzFwI2yMWWSuKVuMOwzqKG173") {
                // create and display blog entry form
                adminController()
            } else {
                // post message to DOM that states the user does not have authorization to view this page. 
                document.getElementById("blogEntry").innerHTML = "<h4>You are not authorized to view this page.</h4>"
            }

            return user

        } else {
            console.log("user is signed out")
            document.getElementById("logout").classList.add("hidden")
            
            // clear out contents of the admin form DOM element.
            document.getElementById("blogEntry").innerHTML = ""

            // return null since no current user
            return null
        }
    });
}

module.exports = validateUser