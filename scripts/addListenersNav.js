const populateProjects = require("./projects/projects-controller")
const blogController = require("./blog/blogController")
const validateUser = require("./admin/validateUser")
const createLogin = require("./admin/createLogin")
const loginAddListeners = require("./admin/loginAddListeners")
const adminController = require("./admin/adminController")
const observer = require("./admin/observer")

function addListenersNav() {
    $("#myNavbar").on("click", e=>{
        if (!e.target.className.includes("nav__link--bio ")) {
            console.log(e)
            // find out what link was clicked on
            let targetClasses = Array.from(e.target.classList)

            let sectionName = targetClasses.find(clazz => {
                return clazz.startsWith("nav__link")
            }).split("--")[1]

            //console.log(sectionName)
            
            // Add `hidden` class to all main sections
            Array.from(document.getElementsByClassName("mainSection"))
                .forEach(section => section.classList.add("hidden"))

            // unhide the section clicked
            $(`#${sectionName}`).removeClass("hidden")

            if (sectionName === "projects") {
                populateProjects()
            }
            if (sectionName === "blog") {
                blogController.init()    
            }

            if (sectionName === "admin") {
                // createLogin()
                // loginAddListeners()
                
                observer.init()
                
            
                // check if the user is authorized to use blog entry form
                // if (user) {
                //     console.log(user.uid)
                //     if (user.uid === "OmaxzFwI2yMWWSuKVuMOwzqKG173") {
                //         // create and display blog entry form
                //         adminController()
                //     } else {
                //         // post message to DOM that states the user does not have authorization to view this page.
                    
                //         document.getElementById("blogEntry").innerHTML = "<h4>You are not authorized to view this page.</h4>"
                //     }
                // } else {
                //     document.getElementById("logout").classList.add("hidden")
                    
                //     // clear out contents of the admin form DOM element.
                //     document.getElementById("blogEntry").innerHTML = ""
                    
                // }

            }
        }
    })

}

module.exports = addListenersNav