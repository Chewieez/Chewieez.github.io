

// blog generator function and blog factory function are in the blog-factory.js file


// pull current blog database from local storage and parse into variable
// make new function that runs produceBlogDatabase() and then reloads page
const retrievedBlogDatabase = JSON.parse(localStorage.getItem("blogPosts")) || produceBlogDatabase()
console.log("retrievedBlogDatabase is: ", retrievedBlogDatabase)

// Create `articles` key if it doesn't exist
retrievedBlogDatabase.blogArray = retrievedBlogDatabase.blogArray || []


// get control of DOM input elements
let newBlogTitleEl = document.getElementById("admin-blog-title")
let newBlogAuthorEl = document.getElementById("admin-blog-author")
let newBlogContentEl = document.getElementById("admin-blog-content")
let newBlogTagsEl = document.getElementById("admin-blog-tags")

// get content out of each form field and assign to variable and then push data into the factory function
const saveBlogEl = document.getElementById("admin-save-blog")

saveBlogEl.addEventListener("click", function(event){
    lastId = retrievedBlogDatabase.blogArray[0].id
    const newBlogPost = blogObjectFactory(
        newBlogTitleEl.value,
        newBlogContentEl.value,
        newBlogAuthorEl.value,
        newBlogTagsEl.value,
    )

    retrievedBlogDatabase.blogArray.unshift(newBlogPost);
    
    localStorage.setItem("blogPosts", JSON.stringify(retrievedBlogDatabase))
})

// setup click event to run the function to take user input field content and generate a new blog post