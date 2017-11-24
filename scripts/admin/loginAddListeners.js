const createLogin = require("./createLogin")


const addListeners = function () {

    document.getElementById("adminCreateLoginBtn").addEventListener("click", (event) =>{

        const userEmail = document.querySelector("[name='adminLoginEmail']").value;
        const userPassword = document.querySelector("[name='adminLoginPassword']").value;
    
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ...
        });
    })


    document.getElementById("adminLoginBtn").addEventListener("click", (event) =>{

        const userEmail = document.querySelector("[name='adminLoginEmail']").value;
        const userPassword = document.querySelector("[name='adminLoginPassword']").value;
    
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(()=>{
            // empty login fields
            document.querySelector("[name='adminLoginEmail']").value = "";
            document.querySelector("[name='adminLoginPassword']").value = "";

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ...
        });
    })
    
    document.getElementById("adminLogoutBtn").addEventListener("click", (event) => {
        
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Logout Successful")


            // clear out contents of the admin form DOM element
            document.getElementById("blogEntry").innerHTML = ""

            // display the login form
            document.getElementById("adminLogin").classList.remove("hidden")
        }).catch(function(error) {
            // An error happened.
            console.log("Could log out the current user")
        });
    })
}



module.exports = addListeners