
// blog generator function and blog factory function are in the blog-factory.js file


// pull current blog database from local storage and parse into variable. If database doesn't exist, run function to create it. The function produceBlogDatabase() resides in the blog-factory.js file
const retrievedBlogDatabase = JSON.parse(localStorage.getItem("blogPosts")) || produceBlogDatabase()
// console.log("retrievedBlogDatabase is: ", retrievedBlogDatabase)

// Create `blogArray` key if it doesn't exist
retrievedBlogDatabase.blogArray = retrievedBlogDatabase.blogArray || []

// get control of DOM input elements
let newBlogTitleEl = document.getElementById("admin-blog-title")
let newBlogAuthorEl = document.getElementById("admin-blog-author")
let newBlogContentEl = document.getElementById("admin-blog-content")
let newBlogTagsEl = document.getElementById("admin-blog-tags")

// set an edit flag to hold whether the user is in edit mode and 
let editMode = false;

let blogToEdit = {};

// get control of the button DOM element the user will click to save the new blog entry
const saveBlogEl = document.getElementById("admin-save-blog")

// setup click event to run the function to take user input field content and generate a new blog post
saveBlogEl.addEventListener("click", createBlogPost)

function createBlogPost() {
    // check if the validateForm function returns true
    if (validateForm()) {

        if (!editMode) {
            //set lastId to the most recently posted blog, so this new one we are creating will have a concurrent Id number
            lastId = retrievedBlogDatabase.blogArray[0].id
            
            // use content that was entered into admin form element to create new blog 
            const newBlogPost = blogObjectFactory(
                newBlogTitleEl.value,
                newBlogContentEl.value,
                newBlogAuthorEl.value,
                newBlogTagsEl.value,
            )
            // store this new blog post object at the beginning of the array of blog posts
            retrievedBlogDatabase.blogArray.unshift(newBlogPost);
        } else {
            // use edited blog object plus the new values in the form to amend the blog entry 
            // get blog database array and find the index of the edited article and replace it
            // const retrievedBlogs = JSON.parse(localStorage.getItem("blogPosts"))
            
            // add values in form field to the blogToEdit before replacing it in database
            blogToEdit.author = newBlogAuthorEl.value
            blogToEdit.title = newBlogTitleEl.value
            blogToEdit.content = newBlogContentEl.value
            blogToEdit.tags = newBlogTagsEl.value


        // use the already retrieved blog array
            retrievedBlogDatabase.blogArray.forEach(entry => {
                if (entry.id === blogToEdit.id) {
                    entry = blogToEdit
                }
            })
        }

        // store new appended blog database in local storage
        localStorage.setItem("blogPosts", JSON.stringify(retrievedBlogDatabase))
        //clear out contents of blog entry form
        clearBlogEntryForm()
        // create a new button to allow the user to quickly navigate to the blog page to read and review blogs
        createButtonToBlogPage()
    }
    // if validateForm function returns false, nothing happens in this function/click handler and form remains populated so the user can correct their errors and reclick Save Blog
}   
    
listBlogs()

let blogListForEditsEl = document.getElementById("blogListForEdits")

blogListForEditsEl.addEventListener("click", () => {
    blogToEdit = findBlogToEdit();
    fillBlogFormForEdit(blogToEdit)
})


// form validation function
function validateForm() {
    // assigns the value of each required input field to a variable
    let isThereTitle = document.forms["adminBlogEntryForm"]["admin-blog-title"];
    let isThereAuthor = document.forms["adminBlogEntryForm"]["admin-blog-author"];
    let isThereContent = document.forms["adminBlogEntryForm"]["admin-blog-content"];

    // checks if each field is empty and executes a unique error message
    if (isThereTitle.value === "") {
        alert('Error: \n' 
        + '\t• Name must be filled out\n\n'
        + 'Please fix errors and resubmit'
        );
         
        return false;
    }
    else if (isThereAuthor.value === "") {
        alert('Error: \n' 
        + '\t• Author must be filled out\n\n'
        + 'Please fix errors and resubmit'
        );
        return false;
    }
    else if (isThereContent.value === "") {
        alert('Error: \n' 
        + '\t• Content must be filled out\n\n'
        + 'Please fix errors and resubmit'
        );
        return false;
    }
    // return true if the form includes required fields so the click handler event can run the code to submit the blog post
    else {
        return true;
    }
}

// clears out the form elements
function clearBlogEntryForm() {
    document.forms["adminBlogEntryForm"].reset();
}

// make a button show up after the user has submitted the new blog post that lets them click through to the blog page to read and review blogs
function createButtonToBlogPage () {
    // check if the button to view the blog page already exists. If not, create it. This will prevent the button from duplicating if the user creates more than one blog entry without refreshing the page
    if (document.getElementById("btnToBlogs") === null) {
        let newButtonEl = document.getElementById("new-button");
        newButtonEl.innerHTML += `
        <button id="btnToBlogs" class="btn btn-success">View Blogs</button>
        `
    }
    // get control of new button DOM element, then add event listener to it
    let btnToBlogsEl = document.getElementById("btnToBlogs")
    btnToBlogsEl.addEventListener("click", function(){
        // send user to the blog page when they click on the button
        window.location.href = "http://localhost:8080/blog/index.html"
    })
    
}

function listBlogs() {

    let blogListContainer = "<div id='blogListForEdits' class='blogList'></div>"

    const blogList = document.createElement("div");
    blogList.className = "blogList";
    blogList.id = "blogListForEdits";


    document.getElementById("site-content").appendChild(blogList);
    
    let blogListForEditingDomString = "<h2>Blog Entries</h2>"
    
    retrievedBlogDatabase.blogArray.forEach(currentBlog => {
        blogListForEditingDomString += `
        <p id='blog_${currentBlog.id}'>${currentBlog.title} <button id='blogBtn_${currentBlog.id}'class='btn btn-primary btn-sm'>Edit</button></p>
        `

    })
    
    blogList.innerHTML += blogListForEditingDomString
    
}

function findBlogToEdit() {
    let selectedBlogId = parseInt(event.target.id.split("_")[1])
    console.log(selectedBlogId)
    
    let blogToEdit = retrievedBlogDatabase.blogArray.find(blog => {
        return blog.id === selectedBlogId
    })
    
    return blogToEdit
}

function fillBlogFormForEdit(blogToEdit) {
    document.getElementById("admin-blog-title").value = blogToEdit.title
    document.getElementById("admin-blog-author").value = blogToEdit.author
    document.getElementById("admin-blog-content").value = blogToEdit.content
    document.getElementById("admin-blog-tags").value = blogToEdit.tags

    editMode = true;
}