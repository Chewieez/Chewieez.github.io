

// blog generator function and blog factory function are in the blog-factory.js file


// pull current blog database from local storage and parse into variable
// make new function that runs produceBlogDatabase() and then reloads page
const retrievedBlogDatabase = JSON.parse(localStorage.getItem("blogPosts")) || produceBlogDatabase()
console.log("retrievedBlogDatabase is: ", retrievedBlogDatabase)

// Create `blogArray` key if it doesn't exist
retrievedBlogDatabase.blogArray = retrievedBlogDatabase.blogArray || []


// get control of DOM input elements
let newBlogTitleEl = document.getElementById("admin-blog-title")
let newBlogAuthorEl = document.getElementById("admin-blog-author")
let newBlogContentEl = document.getElementById("admin-blog-content")
let newBlogTagsEl = document.getElementById("admin-blog-tags")

// get content out of each form field and assign to variable and then push data into the factory function
const saveBlogEl = document.getElementById("admin-save-blog")

// setup click event to run the function to take user input field content and generate a new blog post
saveBlogEl.addEventListener("click", function(event){
    lastId = retrievedBlogDatabase.blogArray[0].id
    console.log("retrievedBlogDatabase.blogArray[0].id", retrievedBlogDatabase.blogArray[0].id)
    console.log("lastId = ", lastId);
    const newBlogPost = blogObjectFactory(
        newBlogTitleEl.value,
        newBlogContentEl.value,
        newBlogAuthorEl.value,
        newBlogTagsEl.value,
    )
    // store this new blog post object at the beginning of the array of blog posts
    retrievedBlogDatabase.blogArray.unshift(newBlogPost);
    // store new appended blog database in local storage
    localStorage.setItem("blogPosts", JSON.stringify(retrievedBlogDatabase))
    //clear out contents of blog entry form
    clearBlogEntryForm()
    createButtonToBlogPage()
})


// clears out the form elements
function clearBlogEntryForm() {
    newBlogAuthorEl.value = "";
    newBlogTitleEl.value = "";
    newBlogContentEl.value = "";
    newBlogTagsEl.value = "";
}

// make a button show up after the user has submitted the new blog post that lets them click through to the blog page to read blogs
function createButtonToBlogPage () {
    let AdminPageEl = document.getElementById("admin-blog-entry");
    AdminPageEl.innerHTML += `
    <button id="btnToBlogs" class="btn btn-success">View Blogs</button>
    `
    let btnToBlogsEl = document.getElementById("btnToBlogs")
    btnToBlogsEl.addEventListener("click", function(){
        window.location.href = "http://localhost:8080/blog/index.html"
    })
}