const addListenersNav = require("./addListenersNav")
const populateProjects = require("./projects/projects-controller")
const populateContactInfo = require("./contact/contact")
const populateResume = require("./resume/resume-controller")


addListenersNav()
populateProjects()
populateContactInfo()
populateResume()