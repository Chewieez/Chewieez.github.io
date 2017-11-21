const addListenersNav = require("./addListenersNav")
const populateProjects = require("./projects/projects-controller")
const populateContactInfo = require("./contact/contact")
const populateResume = require("./resume/resume-controller")
const Blogs = require("./blog/blogInit")


addListenersNav()
populateProjects()
populateContactInfo()
populateResume()

Blogs.retrieve()
