const addListenersNav = require("./addListenersNav")
// const populateProjects = require("./projects/projects-controller")
const populateContactInfo = require("./contact/contact")
const populateResume = require("./resume/resume-controller")
//const blogFactory = require("./blog/factory")
//const blogController = require("./blog/blogController")
//const adminController = require("./admin/adminController")
const createLogin = require("./admin/createLogin")
const loginAddListeners = require("./admin/loginAddListeners")
//const validateUser = require("./admin/validateUser")
const auth = require("./admin/validateUser")

createLogin()
loginAddListeners()

auth.init()

addListenersNav()

// validateUser()
//populateProjects()

populateContactInfo()
populateResume()
