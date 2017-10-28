// pulling blog database out of Local Storage
const retrievedBlogs = JSON.parse(localStorage.getItem("blogPosts"));

// selecting the HTML container to place my javascript code and assigning it to a variable
let blogViewEl = document.getElementById("blog-view");
let blogEntriesEl = document.getElementById("blog-entries-list"); 

// assign array of blog posts from the blog database to a variable
const blogPostsArray = retrievedBlogs.blogArray
console.log("blogPostsArray: ", blogPostsArray)

// assign DOM search field element to a variable
let searchEl = document.getElementById("search-input") 





// create a results array to hold the matching blog posts
// and populate it with all the blogs on first page load
let blogSearchResults = blogPostsArray

// create function to search through blogs using the search Query


//setup event handler to track key up strokes after the 3rd key and initiate a search function
searchEl.addEventListener("keyup", function(event){
    
    //console.log(searchEl.value.length)
    
    // clear the search results after each keystroke
    blogSearchResults = [];
    
    // determine if the keyup is the 3rd one and start a search based on the characters in the input field
    if (searchEl.value.length >= 3) {

        // assign the contents of input field to a variable
        let searchQuery = searchEl.value.toLowerCase();
        console.log("searchQuery =", searchQuery)
        
        
        // search through array and check if any blogs include the searchQuery
        blogPostsArray.forEach(function (blog) {
            // make all blog content to search lower case to make search case insensitive
            let blogTitle = blog.title.toLowerCase()
            let blogContent = blog.content.toLowerCase()
        
            // check if the blog title or the blog content contains the searchQuery
            if (blogTitle.includes(searchQuery) || blogContent.includes(searchQuery)){

                // push the matching blog into the results array
                blogSearchResults.push(blog);
            }
            else {
                console.log("can't find one")
            }
        })
        
        console.log("blogSearchResults = ", blogSearchResults)
        
        // run function to populate the page with blogs
        loadFullPage()



        /*-- OLD CODE, encapsulated all code to populate page with blogs into one function --*/
        // run function to populate page with filtered content     
        // produceBlogs({
        //      "target": {
        //          "classList": ["page-1"]
        //      }
        // })
        /* ---  ---*/   
    }
    
    else if (event.keyCode === 13) {
        // assign the contents of input field to a variable
        let searchQuery = searchEl.value.toLowerCase();
        console.log("searchQuery =", searchQuery)
        
        
        // search through array and check if any blogs include the searchQuery
        blogPostsArray.forEach(function (blog) {
            // make all blog content to search lower case to make search case insensitive
            let blogTitle = blog.title.toLowerCase()
            let blogContent = blog.content.toLowerCase()
        
            // check if the blog title or the blog content contains the searchQuery
            if (blogTitle.includes(searchQuery) || blogContent.includes(searchQuery)){

                // push the matching blog into the results array
                blogSearchResults.push(blog);
            }
            else {
                console.log("can't find one")
            }
        })
        
        console.log("blogSearchResults = ", blogSearchResults)
        
        // run function to populate the page with blogs
        loadFullPage()

        
    }


})
loadFullPage()

function loadFullPage() {
/* -- Start Pagination code -- */
// assign the search results array to the totalItems for pagination
let totalItems = blogSearchResults.length
//const totalItems = blogPostsArray.length

const itemsPerPage = 5
let numberOfPages = Math.ceil(totalItems / itemsPerPage)
const paginationEl = document.getElementById("blogPaginator")

// Build the DOM string for the pagination links in the footer
let paginationString = "<ul>"
paginationString += "<li><a id='previous' href='#'>&lt;</a></li>"

for (var i = 0; i < numberOfPages; i++) {
    paginationString += ` <li><a class="blogPage page-${i+1}" href="#">${i+1}</a></li>`
}
// Go ahead and give the > character a class of page-2 on first page load
paginationString += "<li><a id='next' class='page-2' href='#'>&gt;</a></li>"
paginationString += "</ul>"

// Update the DOM with the unordered list we just built
paginationEl.innerHTML = paginationString

// Store references to the next and previous arrows we just added
const previousEl = document.getElementById("previous")
const nextEl = document.getElementById("next")

/*
    Function that will be invoked each time the user clicks
    on one of the pagination links at the bottom of the page
*/
function produceBlogs(event) {
   
    // Clear the list of blogs first before displaying the new ones
    blogViewEl.innerHTML = ""

    // Which number did the user click on?
    // This function is creating a new array from dom token content in event.target.classList. Then using the .find function to search each string inside the array for "page-". If that exists, it splits the word into two pieces and places ii in a new array; ["page-", "1"] (whatever number that follows). Then the element at index[1] is converted into an integer with parseInt()
    const pageNumber = parseInt(
        Array.from(event.target.classList)
        .find(clazz => {
            if (clazz.startsWith("page-")) return clazz
        })
        .split("-")[1]
    )


    // Change the class name of the previous arrow
    // Could use .style.visibility = "hidden" or "visible"
    if ((pageNumber - 1) === 0) {
        previousEl.style.visibility = "hidden"
    } else {
        previousEl.style.visibility = "visible"
        previousEl.className = `page-${pageNumber - 1}`
    }

    // Change the class name of the next arrow
    if ((pageNumber + 1) > numberOfPages) {
        nextEl.style.visibility = "hidden"
    } else {
        nextEl.style.visibility = "visible"
        nextEl.className = `page-${pageNumber + 1}`
    }

    // Determine which items to display by slicing the array
    const itemsToDisplay = blogSearchResults.slice(
    // const itemsToDisplay = blogPostsArray.slice(       // code pre search input field
        (pageNumber - 1) * itemsPerPage, 
        pageNumber * itemsPerPage
     )

    // Display a <section> representation of each data object by looping through the array of blog posts that was extracted from the object (retrievedBlogs) 
    for (let i = 0; i < itemsToDisplay.length; i++) {
        let currentBlog = itemsToDisplay[i];
        let currentBlogPublishedDate = moment(parseInt(currentBlog.published)).format("dddd, MMMM Do YYYY")
        
        blogViewEl.innerHTML += `
        <article  id="blogPost-${currentBlog.id}">
                <h4 class="blog-title">${currentBlog.title}</h4>
                <p class="blog-subheading"><span class="special-text">by:</span> ${currentBlog.author}    <span class="special-text">published on:</span> ${currentBlogPublishedDate}</p>
                
                `
                

        if (currentBlog.content.length > 470) {
            blogViewEl.innerHTML += `
            <div id="blogContent-${currentBlog.id}" class="abridged">
                <p class="blog-content">${currentBlog.content}</p>
            </div>
            <button id="expandContent-${currentBlog.id}" class="expandContentBtn">Click to read more</button>
            `
        } else {
            blogViewEl.innerHTML += `
            <div id="blogContent-${currentBlog.id}">
                <p class="blog-content">${currentBlog.content}</p>
            </div>
            `
        } 
        
        blogViewEl.innerHTML += `
        <p class="blog-tags">tags: ${currentBlog.tags}</p>
        <hr>
        </article>
        `
    }
}

// Get the array of pagination anchor tags we added to the DOM
const blogLinks = document.getElementsByClassName("blogPage")

// Add event listeners to each <a> element in the pagination
for (let j = 0; j < blogLinks.length; j++) {
    let thisBlogEl = blogLinks[j];
    thisBlogEl.addEventListener("click", produceBlogs);
}

// Initially show page one on first page load
produceBlogs({
    "target": {
        "classList": ["page-1"]
    }
})

previousEl.addEventListener("click", produceBlogs)
nextEl.addEventListener("click", produceBlogs)





function fillSideColumnBlogList() {
    blogEntriesEl.innerHTML = ""
for (let i = 0; i < blogPostsArray.length; i++) {
    let currentBlogPost = blogPostsArray[i];
    let currentBlogPublishDate =  moment(parseInt(currentBlogPost.published)).format("dddd, MMMM Do YYYY")       
    blogEntriesEl.innerHTML += `
    <p><a href="#">${currentBlogPublishDate}</a></p>
    `
    } 
}

fillSideColumnBlogList()


// const blogViewEl = document.getElementById("blog-view");

function expandContent(event) {
    console.log("clicked event: ", event)
    let clickedBtn = event.target.id 
    
    // parse out the number in the ID of the event that was clicked
    const clickedBtnId = clickedBtn.split("-")[1];
    
    // check if the ID of event that was clicked starts with "expandContent-". If so, then expand that blog content
    if (clickedBtn.startsWith("expandContent-")) {
        //assign the Id number of the clicked element to the blog content div to be expanded
        let contentToExpand = document.getElementById("blogContent-" + clickedBtnId)
        // toggle the abridged class off when click, to then show the full content.
        contentToExpand.classList.toggle("abridged");
        
    }
}


blogViewEl.addEventListener("click", expandContent)

}