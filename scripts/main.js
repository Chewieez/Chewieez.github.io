const addListenersNav = require("./addListenersNav")
const createLogin = require("./admin/createLogin")
const auth = require("./admin/validateUser")

addListenersNav()
createLogin()
auth.init()
auth.adminSDKInit()
