

const addListeners = function () {

    // create function to expand the content container for a blog post to show it's full contents on a button click
    // this function needs to live outside of the loadFullPage() function for scope, so we can call this function inside our search results function. 
    document.addEventListener("click", (event) => {
        if (event.target.id && event.target.id.includes("expandContent")) {
            let clickedBtnId = event.target.id

            let clickedBtnEl = event.target;
            // console.log("clickedBtnEl: ", clickedBtnEl.innerHTML)

            // parse out the number in the ID of the event that was clicked
            const clickedBtnIdNum = clickedBtnId.split("-")[1];

            // check if the ID of event that was clicked starts with "expandContent-". If so, then expand that blog content
            if (clickedBtnId.startsWith("expandContent-")) {
                //assign the Id number of the clicked element to the blog content div to be expanded
                let contentToExpand = document.getElementById("blogContent-" + clickedBtnIdNum)
                // toggle the abridged class off when click, to then show the full content.
                contentToExpand.classList.toggle("abridged");

                // check if the button clicked says "Click to see less" or "Click to see more" and toggle it's state. 
                if (clickedBtnEl.innerHTML.includes("more")) {
                    clickedBtnEl.innerHTML = "Click to see less"
                }
                else if (clickedBtnEl.innerHTML.includes("less")) {
                    clickedBtnEl.innerHTML = "Click to read more"
                }
            }
        }
    })
}


module.exports = addListeners