const addListenersNav = require("./addListenersNav")
const populateProjects = require("./projects/projects-controller")
const populateContactInfo = require("./contact/contact")
const populateResume = require("./resume/resume-controller")
const blogFactory = require("./blog/factory")
const blogController = require("./blog/blogController")


addListenersNav()
populateProjects()
populateContactInfo()
populateResume()

// blogFactory.retrieveAll()
// blogController.init()