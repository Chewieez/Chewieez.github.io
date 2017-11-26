const firebase = require("firebase")
// const createLogin = require("./createLogin")
const loginAddListeners = require("./loginAddListeners")
const adminController = require("./adminController")

const observer = Object.create(null, {
    "init": {
        value: function (auth) {
            firebase.auth().onAuthStateChanged(function(user) {

                // createLogin()
                // loginAddListeners()

                if (user) {
                    auth.activeUser = user

                    document.getElementById("adminLogin").classList.add("hidden")
                    document.getElementById("logout").classList.remove("hidden")

                    if (user.uid === "OmaxzFwI2yMWWSuKVuMOwzqKG173") {
                        // create and display blog entry form
                        adminController()
                    } else {
                        // post message to DOM that states the user does not have authorization to view this page.
                    
                        document.getElementById("blogEntry").innerHTML = "<h4>You are not authorized to view this page.</h4>"
                    }
                } else {
                    document.getElementById("adminLogin").classList.remove("hidden")
                    
                    // clear out contents of the admin form DOM element.
                    document.getElementById("blogEntry").innerHTML = ""
                    auth.activeUser = null
                }
            })
        }
    }
})

module.exports = observer