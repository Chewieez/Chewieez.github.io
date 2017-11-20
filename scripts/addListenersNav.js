

function addListenersNav() {
    // debugger
    $("#myNavbar").on("click", e=>{
        if (!e.target.className.includes("nav__link--bio")) {
            console.log(e)
            // find out what link was clicked on
            let sectionName = e.target.className.split("--")[1]
            // let sectionEl = $(`#${sectionName}`)
            // Add `hidden` class to all main sections
            Array.from(document.getElementsByClassName("mainSection"))
                .forEach(section => section.classList.add("hidden"))

            // unhide the section clicked
            $(`#${sectionName}`).removeClass("hidden")
        }
    })

}

module.exports = addListenersNav