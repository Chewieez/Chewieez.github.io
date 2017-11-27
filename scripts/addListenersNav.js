const populateProjects = require("./projects/projects-controller")
const blogController = require("./blog/blogController")
const populateResume = require("./resume/resume-controller")
const populateContactInfo = require("./contact/contact")
// const auth = require("./admin/validateUser")
// const createLogin = require("./admin/createLogin")
// const adminController = require("./admin/adminController")
// const observer = require("./admin/observer")

function addListenersNav() {
    $("#myNavbar").on("click", e=>{
        console.log(e)

        // check if the user clicked a nav link that is NOT bio. 
        if (!e.target.className.includes("nav__link--bio")) {
            // find out what link was clicked on
            let targetClasses = Array.from(e.target.classList)

            let sectionName = targetClasses.find(clazz => {
                return clazz.startsWith("nav__link")
            }).split("--")[1]

            // Add `hidden` class to all main sections
            Array.from(document.getElementsByClassName("mainSection"))
                .forEach(section => section.classList.add("hidden"))

            // unhide the section clicked
            $(`#${sectionName}`).removeClass("hidden")

            // initialize the page that was clicked
            switch (sectionName) {
            case "projects":
                populateProjects();
                break;
            case "blog":
                blogController.init();
                break;
            case "resume":
                populateResume();
                break;
            case "contact":
                populateContactInfo();
                break;
            // case "admin":
            //     createLogin()
            //     // loginAddListeners()
            //     auth.init();
            //     break;
            }
        }
    })
}

module.exports = addListenersNav