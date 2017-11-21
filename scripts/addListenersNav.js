const Blogs = require("./blog/factory")

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

            // if (sectionName === "blog") {
            //     Blogs.retrieve()
            // }
        }
    })

}

module.exports = addListenersNav