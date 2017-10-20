// pulling blog database out of Local Storage
const importedBlog = JSON.parse(localStorage.getItem("blogPosts"));

// selecting the HTML container to place my javascript code and assigning it to a variable
let blogViewEl = document.getElementById("blog-view");
let blogEntriesEl = document.getElementById("blog-entries-list"); 

// assign array of blog posts from the blog database to a variable
const blogPostsArray = importedBlog.blogEntries

/* -- Start Pagination code -- */
const totalItems = blogPostsArray.length
const itemsPerPage = 5
const numberOfPages = Math.ceil(totalItems / itemsPerPage)
const paginationEl = document.getElementById("blogPaginator")

// Build the DOM string for the pagination links in the footer
let paginationString = "<ul>"
paginationString += "<li><a id='previous' href='#'>&lt;</a></li>"

for (var i = 0; i < numberOfPages; i++) {
    paginationString += ` <li><a class="blogPage page-${i+1}" href="#">${i+1}</a></li>`
}
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
    // I think this function is creating a new array (or array instance) from content in event.target.classList. Then using the .find function to search for "page-". If that exists, it splits the word into two and places in a new array; "page-" & "1" (whatever number that follows). Then the element (1) at index[1] is converted into an integer with parseInt()
    const pageNumber = parseInt(
        Array.from(event.target.classList)
        .find(clazz => {
            if (clazz.startsWith("page-")) return clazz
        })
        .split("-")[1]
    )
    console.log("event.target.classList", event.target.classList)

    // Change the class name of the previous arrow
    if ((pageNumber - 1) === 0) {
        previousEl.style.display = "none"
    } else {
        previousEl.style.display = "inline"
        previousEl.className = `page-${pageNumber - 1}`
    }

    // Change the class name of the next arrow
    if ((pageNumber + 1) > numberOfPages) {
        nextEl.style.display = "none"
    } else {
        nextEl.style.display = "inline"
        nextEl.className = `page-${pageNumber + 1}`
    }

    // Determine which items to display by slicing the array
    const itemsToDisplay = blogPostsArray.slice(
        (pageNumber - 1) * itemsPerPage, 
        pageNumber * itemsPerPage
     )

    // Display a <section> representation of each data object by looping through the array of blog posts that was extraced from the object (importedBlog) 
    for (let i = 0; i < itemsToDisplay.length; i++) {
        let currentBlog = itemsToDisplay[i];
        blogViewEl.innerHTML += `
        <article  id="blogPost-${currentBlog.id}">
                <h4 class="blog-title">${currentBlog.title}</h4>
                <p class="blog-subheading"><span class="special-text">by:</span> ${currentBlog.author}    <span class="special-text">published on:</span> ${currentBlog.published}</p>
                
                <p class="blog-content">${currentBlog.content}</p>
                
                <p class="blog-tags">tags: ${currentBlog.tags}</p>
        </article>
        <hr>
        `
    }
}

// Get the array of pagination anchor tags we added to the DOM
const blogLinks = document.getElementsByClassName("blogPage")

// Add event listeners to each <a> element in the pagination
for (let j = 0; j < blogLinks.length; j++) {
    let thisBlogEl = blogLinks[j];
    thisBlogEl.addEventListener("click", produceBlogs, false);
}

produceBlogs({
    "target": {
        "classList": ["page-1"]
    }
})

previousEl.addEventListener("click", produceBlogs)
nextEl.addEventListener("click", produceBlogs)





function fillSideColumnBlogList() {
for (let i = 0; i < blogPostsArray.length; i++) {
    let currentBlogPost = blogPostsArray[i];
    let currentBlogPublishDate =  moment(parseInt(currentBlogPost.published)).format("dddd, MMMM Do YYYY")       
    blogEntriesEl.innerHTML += `
    <p><a href="#">${currentBlogPublishDate}</a></p>
    `
    } 
}

fillSideColumnBlogList()

