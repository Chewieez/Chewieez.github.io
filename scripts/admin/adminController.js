const blogFactory = require("../blog/factory")
const createNewBlogEntry = require("./createNewBlogEntry")
const blogController = require("../blog/blogController")

// set an edit flag to hold whether the user is in edit mode and 
let editMode = {
    "flag": false,
    "currentBlogId": null
}


function createBlogEntryForm() {
    
    // get control of section to place the create blog form
    const blogEntrySectionEl = document.getElementById("blogEntry")

    // create a DOM string for the blog entry form 
    let blogEntrySectionString = `
                <header class="page-header"> 
                    <h1>Create a Blog Post</h1>
                </header>   
                <section id="admin-blog-entry">
                    <form name="adminBlogEntryForm">
                    <label>Title</label>
                    <!-- Added autofocus to title input field to automatically place the cursor in this field on page load -->
                    <input type="text" id="admin-blog-title" name="admin-blog-title" placeholder="Enter Blog Title Here" class="form-control" autofocus required>
                    <label>Author</label>
                    <input type="text" id="admin-blog-author" name="admin-blog-author" placeholder="Author name" class="form-control" autocomplete="on" required>
                    <label>Content</label>
                    <textarea id="admin-blog-content"name="admin-blog-content" placeholder="Compose your blog content here"  rows="10" cols="100" class="form-control" required></textarea>
                    <label>Tags</label>
                    <input type="text" id="admin-blog-tags" name="admin-blog-tags" placeholder="separate, tags, with, commas" class="form-control">
                    </form>
                    <br>
                    <button id="admin-save-blog" class="btn btn-primary">Save Blog</button>
                </section>
                <section id="new-button">
                </section>    
            `
    // set the inner HTML of the blog entry DOM element
    blogEntrySectionEl.innerHTML = blogEntrySectionString

    // get control of DOM input elements
    let newBlogTitleEl = document.getElementById("admin-blog-title")
    let newBlogAuthorEl = document.getElementById("admin-blog-author")
    let newBlogContentEl = document.getElementById("admin-blog-content")
    let newBlogTagsEl = document.getElementById("admin-blog-tags")


    // get control of the button DOM element the user will click to save the new blog entry
    const saveBlogEl = document.getElementById("admin-save-blog")


    // setup click event to run the function to take user input field content and generate a new blog post
    saveBlogEl.addEventListener("click", function (event) {
        // check if the validateForm function returns true
        if (validateForm()) {
            // use content that was entered into admin form element to create new blog 
            const blogPost = createNewBlogEntry(
                newBlogTitleEl.value,
                newBlogContentEl.value,
                newBlogAuthorEl.value,
                newBlogTagsEl.value
            )
            
            // check what mode EDIT object is in to know whether to create a new blog post or edit an existing post
            if (editMode.flag === false) {
                // create a POST request to Firebase to store the new blog post
                blogFactory.write(blogPost)
                
            } else {
                // use the edit function on the blogFactory to replace the file in firebase
                blogFactory.edit(blogPost, editMode.currentBlogId)
            }
            
            // clear out contents of blog entry form
            clearBlogEntryForm()
            // create a new button to allow the user to quickly navigate to the blog page to read and review blogs
            createButtonToBlogPage()
        }
        // if validateForm function returns false, nothing happens in this function/click handler and form remains populated so the user can correct their errors and reclick Save Blog
    })

    // list all the blogs below the admin form for editing and deleting
    listBlogs()

    // listen for a click in the list of blogs DOM element
    $("#blogListForEdits").on("click", (e) => {
        
        // figure out which button was clicked
        let selectedBlogId = event.target.id.split("!")[1]
        console.log(selectedBlogId)
        
        // search array of blogs and find the blog entry for editing or deleting
        let blogToEdit = blogFactory.blogCache.find(blog => {
            return blog.id === selectedBlogId
        })
            
    
        if (event.target.id.includes("blogEditBtn")) {
            document.getElementById("admin-blog-title").value = blogToEdit.title
            document.getElementById("admin-blog-author").value = blogToEdit.author
            document.getElementById("admin-blog-content").value = blogToEdit.content
            document.getElementById("admin-blog-tags").value = blogToEdit.tags
            
            editMode.flag = true;
            editMode.currentBlogId = blogToEdit.id
    
        } else if (event.target.id.includes("blogDeleteBtn")) {
            blogFactory.delete(blogToEdit.id)
            listBlogs()
        }
    })
}



// form validation function
function validateForm() {
    // assigns the value of each required input field to a variable
    let isThereTitle = document.forms["adminBlogEntryForm"]["admin-blog-title"];
    let isThereAuthor = document.forms["adminBlogEntryForm"]["admin-blog-author"];
    let isThereContent = document.forms["adminBlogEntryForm"]["admin-blog-content"];

    // checks if each field is empty and executes a unique error message
    if (isThereTitle.value === "") {
        alert("Error: \n"
            + "\t• Name must be filled out\n\n"
            + "Please fix errors and resubmit"
        );

        return false;
    }
    else if (isThereAuthor.value === "") {
        alert("Error: \n"
            + "\t• Author must be filled out\n\n"
            + "Please fix errors and resubmit"
        );
        return false;
    }
    else if (isThereContent.value === "") {
        alert("Error: \n"
            + "\t• Content must be filled out\n\n"
            + "Please fix errors and resubmit"
        );
        return false;
    }
    // return true is the form includes required fields so the click handler event can run the code to submit the blog post
    else {
        return true;
    }
}

// clears out the form elements
function clearBlogEntryForm() {
    document.forms["adminBlogEntryForm"].reset();
}


// make a button show up after the user has submitted the new blog post that lets them click through to the blog page to read and review blogs
function createButtonToBlogPage() {
    // check if the button to view the blog page already exists. If not, create it. This will prevent the button from duplicating if the user creates more than one blog entry without refreshing the page
    if (document.getElementById("btnToBlogs") === null) {
        let newButtonEl = document.getElementById("new-button");
        newButtonEl.innerHTML += `
        <button id="btnToBlogs" class="btn btn-success">View Blogs</button>
        `
    }
    // get control of new button DOM element, then add event listener to it
    let btnToBlogsEl = document.getElementById("btnToBlogs")
    btnToBlogsEl.addEventListener("click", function () {
        // send user to the blog page when they click on the button
        blogController.init();

        // hide admin page
        $("#admin").addClass("hidden")
        // reveal blog page
        $("#blog").removeClass("hidden")
    })

}

// list all of the blogs in the database underneith the blog entry form
function listBlogs() {
    
    blogFactory.retrieveAll().then(blogDatabase => {
        
        blogDatabase.sort((a, b) => {
            return b.published - a.published
        })

        let blogListForEditingDomString = "<h2>Blog Entries</h2>"

        blogDatabase.forEach(currentBlog => {
            blogListForEditingDomString += `
                <div id='blog!${currentBlog.id}'>${currentBlog.title}<button id='blogEditBtn!${currentBlog.id}' class='btn btn-primary btn-sm'>Edit</button>
                <button id='blogDeleteBtn!${currentBlog.id}' class='btn btn-warning btn-sm'>Delete</button>
                </div>
                `
        })

        document.getElementById("blogListForEdits").innerHTML = blogListForEditingDomString
    })
            
}
    

module.exports = createBlogEntryForm