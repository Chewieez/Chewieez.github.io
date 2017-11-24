(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const blogController = require("./blog/blogController")

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

            if (sectionName === "blog") {
                blogController.init()
                
            }
        }
    })

}

module.exports = addListenersNav
},{"./blog/blogController":7}],2:[function(require,module,exports){
const blogFactory = require("../blog/factory")



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
            const newBlogPost = blogObjectFactory(
                newBlogTitleEl.value,
                newBlogContentEl.value,
                newBlogAuthorEl.value,
                newBlogTagsEl.value
            )
            // create a POST request to Firebase to store the new blog post

            // clear out contents of blog entry form
            // clearBlogEntryForm()
            // create a new button to allow the user to quickly navigate to the blog page to read and review blogs
            createButtonToBlogPage()
        }
        // if validateForm function returns false, nothing happens in this function/click handler and form remains populated so the user can correct their errors and reclick Save Blog
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
        window.location.href = "http://localhost:8080/blog/index.html"
    })

}

module.exports = createBlogEntryForm
},{"../blog/factory":8}],3:[function(require,module,exports){

function createLogin() {

    const loggingInOutControlsEl = document.getElementById("loggingInOutControls")

    let loggingInOutControlsDOMString = `
        <section class="login" id="adminLogin">
            <header class="page-header">
                <h3>Login</h3>
            </header>
            <form name="adminLoginForm">
                <label>Email</label>
                <input type="email" name="adminLoginEmail" class="form-control" autofocus required placeholder="...email">
                <label>Password</label>
                <input type="password" name="adminLoginPassword" class="form-control"  required placeholder="...password">
            </form>
                <button class="btn btn-primary" id="adminLoginBtn">Login</button>
                <button class="btn btn-success" id="adminCreateLoginBtn">Create Account</button>
        </section>
        <section class="logout hidden" id="logout">
            <button class="btn btn-warning" id="adminLogoutBtn">Logout</button>
        </section>
    `

    loggingInOutControlsEl.innerHTML = loggingInOutControlsDOMString

}

module.exports = createLogin
},{}],4:[function(require,module,exports){
const createLogin = require("./createLogin")


const addListeners = function () {

    document.getElementById("adminCreateLoginBtn").addEventListener("click", (event) =>{

        const userEmail = document.querySelector("[name='adminLoginEmail']").value;
        const userPassword = document.querySelector("[name='adminLoginPassword']").value;
    
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ...
        });
    })


    document.getElementById("adminLoginBtn").addEventListener("click", (event) =>{

        const userEmail = document.querySelector("[name='adminLoginEmail']").value;
        const userPassword = document.querySelector("[name='adminLoginPassword']").value;
    
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ...
        });
    })
    
    document.getElementById("adminLogoutBtn").addEventListener("click", (event) => {
        
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Logout Successful")
            createLogin()
        }).catch(function(error) {
            // An error happened.
            console.log("Could log out the current user")
        });
    })
}



module.exports = addListeners
},{"./createLogin":3}],5:[function(require,module,exports){
const adminController = require("./adminController")
const createLogin = require("./createLogin")
const loginAddListeners = require("./loginAddListeners")

function validateUser() {
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            
            // create and display login and logout form and buttons and hide login form
            createLogin()
            document.getElementById("adminLogin").classList.add("hidden")
            document.getElementById("logout").classList.remove("hidden")
            // create and display blog entry form
            adminController()
            
        } else {
            console.log("user is signed out")
            // create and display login form 
            createLogin()
            document.getElementById("logout").classList.add("hidden")
            
            // clear out contents of the admin form
            document.getElementById("blogEntry").innerHTML = ""
        }

        loginAddListeners()
    
    });

}

module.exports = validateUser
},{"./adminController":2,"./createLogin":3,"./loginAddListeners":4}],6:[function(require,module,exports){


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
},{}],7:[function(require,module,exports){
//const paginate = require("../pagination")
//const blogComponent = require("./createBogComponent")
const blogFactory = require("./factory")
const populate = require("./populate")
const addListeners = require("./addListeners")

const blogController = Object.create(null, {
    "init": {
        value: function () {
            
            blogFactory.retrieveAll().then(blogs => {
                populate(blogs)
                addListeners(blogs)
                // paginate.itemsToPaginate = blogs
                // paginate.start(".blog__paginator", ".blog__articles", blogComponent)
            })
            //filter.init()
        }
    }
})

module.exports = blogController
},{"./addListeners":6,"./factory":8,"./populate":9}],8:[function(require,module,exports){
// creates a blog object that will hold blog entries and contains methods that pertain to handling blog entries

const addListeners = require("./addListeners")
const populate = require("./populate")



const blogFactory = Object.create(null, {
    "blogCache": {
        "value": {},
        "writable": true
    },
    "write": {
        "value": {
            // insert function to write new blog to Firebase
        },
    },
    "retrieveAll": {
        "value": function (callback,...callbacks) {
            // pull blogs from Firebase
            return $.ajax({
                "url": "https://personal-site-60774.firebaseio.com/blogArray.json"
            }).then( blogDatabase => {
                // assign blog posts to this object
                this.blogCache = blogDatabase
                this.cache = Object.keys(blogDatabase)
                    .map(key => {
                        blogDatabase[key].id = key
                        return blogDatabase[key]
                    })

                return this.blogCache

                // I'm thinking this below could be callback hell
                // // if a callback function is passed in, run it
                // if (callback) {
                //     callback(blogDatabase)
                // }

                // //if multiple callback functions are passed in, call each one
                // if (callbacks.length > 0) {
                //     callbacks.forEach(c => c())
                // }
            })
        }
    },
    "populate": {
        "value": populate
    },
    "edit": {
        "value": {
            // insert function to edit a blog post on Firebase
        },
    },
    "addListeners": {
        "value": addListeners
    }
})
//
module.exports = blogFactory
},{"./addListeners":6,"./populate":9}],9:[function(require,module,exports){


const populate = (blogEntries) => {
    const blogViewEl = document.getElementById("blog-view")
    const blogEntriesEl = document.getElementById("blog-entries-list")

    let blogViewContentString = ""
    let blogEntriesListString = ""

    blogEntries.forEach(currentBlog => {
        // use Moment.js to format published date and store in a variable
        //let currentBlogPublishedDate = moment(currentBlog.published).format("dddd, MMMM Do YYYY")
        let currentBlogPublishedDate = currentBlog.published

        blogViewContentString += `
            <article  id="blogPost-${currentBlog.id}">
                    <h4 class="blog-title">${currentBlog.title}</h4>
                    <p class="blog-subheading"><span class="special-text">by:</span> ${currentBlog.author}    <span class="special-text">published on:</span> ${currentBlogPublishedDate}</p>
                    `

        // check if the content for the blog post is created than 470 characters. If it is 
        if (currentBlog.content.length > 470) {
            blogViewContentString += `
                <div id="blogContent-${currentBlog.id}" class="abridged">
                    <p class="blog-content">${currentBlog.content}</p>
                </div>
                <button id="expandContent-${currentBlog.id}" class="expandContentBtn">Click to read more</button>
                `
        } else {
            blogViewContentString += `
                <div id="blogContent-${currentBlog.id}">
                    <p class="blog-content">${currentBlog.content}</p>
                </div>
                `
        }

        blogViewContentString += `
            <p class="blog-tags">tags: ${currentBlog.tags}</p>
            <hr>
            </article>
            `

        // post blog creation data info to the right column
        blogEntriesListString += `
                <p><a href="#">${currentBlogPublishedDate}</a></p>
                `

    })

    // Print blog content and data info to DOM
    blogViewEl.innerHTML += blogViewContentString
    blogEntriesEl.innerHTML += blogEntriesListString

   
}


module.exports = populate
},{}],10:[function(require,module,exports){
const contactInfo = {};

const twitterInfo = {
    "socialPlatform": "Twitter",
    "username": "@gregaudio",
    "url": "http://www.twitter.com/gregaudio",
    "icon": "/images/Twitter_Logo_Blue.png",
}

const linkedInInfo = {
    "socialPlatform": "LinkedIn",
    "username": "gregmlawrence",
    "url": "https://www.linkedin.com/in/gregmlawrence/",
    "icon": "/images/In-2C-54px-R.png",
}

const githubInfo = {
    "socialPlatform": "GitHub",
    "username": "Chewieez",
    "url": "https://github.com/Chewieez",
    "icon": "/images/GitHub-Mark-64px.png"    
}

contactInfo.twitterInfo = twitterInfo;
contactInfo.linkedInInfo = linkedInInfo;
contactInfo.githubInfo = githubInfo;

// convert data object to string and store in local storage
let contactInfoString = JSON.stringify(contactInfo);
localStorage.setItem("contactInfo", contactInfoString);



function populateContactInfo () {
    // Pull data from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/contactInfo.json"
    }).then ((contactInfo) => {
        let retrievedContactInfo = contactInfo

        // get element from DOM to place contact data
        let contactDomEl = document.getElementById("contact-list");
        
        // loop through retreived data from local storage
        for (let key in retrievedContactInfo) {
            let individualContactInfo = retrievedContactInfo[key]
        
            contactDomEl.innerHTML += `
            
                    <p><img src="${individualContactInfo.icon}" width="50px" alt="${individualContactInfo.socialPlatform} title="${individualContactInfo.socialPlatform}"/> <a href="${individualContactInfo.url}">${individualContactInfo.username}</a></p>
            
            `
            
        }

    })

}


module.exports = populateContactInfo
},{}],11:[function(require,module,exports){
const addListenersNav = require("./addListenersNav")
const populateProjects = require("./projects/projects-controller")
const populateContactInfo = require("./contact/contact")
const populateResume = require("./resume/resume-controller")
const blogFactory = require("./blog/factory")
const blogController = require("./blog/blogController")
//const adminController = require("./admin/adminController")
// const createLogin = require("./admin/createLogin")
// const loginAddListeners = require("./admin/loginAddListeners")
const validateUser = require("./admin/validateUser")


// createLogin()
validateUser()
// loginAddListeners()
addListenersNav()
populateProjects()
populateContactInfo()
populateResume()

// blogFactory.retrieveAll()
// blogController.init()
},{"./addListenersNav":1,"./admin/validateUser":5,"./blog/blogController":7,"./blog/factory":8,"./contact/contact":10,"./projects/projects-controller":12,"./resume/resume-controller":13}],12:[function(require,module,exports){


function populateProjects() {
    // pull project data from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/projectsArray.json"
    }).then((projects) => {
        const projectsArray = projects

        // grab control of HTML container with document.getElementById()
        let portfolioEl = document.getElementById("portfolio")
        let portfolioString = ""
        // loop through arrays in object
        projectsArray.forEach(project => {
            // populate html container variable with project content
            portfolioString += `
                <article class="col-sm-6">
                    <div class="thumbnail">
                        <a href="${project.image}" target="_blank"><img src="${project.image}" class="img-responsive" alt="${project.name}">
                            <div class="caption">
                            <h4>${project.name}</h4>
                            <p><span class="important-text">Date completed:</span> ${project.date} &nbsp; &nbsp; <span class="important-text">Teammates:</span> ${project.teammates}</p>
                            <p><span class="important-text">Technologies used:</span> ${project.technologies}</p>
                            </div>
                        </a>
                    </div>
                </article>
            `
        })
        portfolioEl.innerHTML = portfolioString
    })
}

module.exports = populateProjects
},{}],13:[function(require,module,exports){

function populateResume() {
    // pull professionalHistory Database from local storage
    // const professionalHistoryD = JSON.parse(localStorage.getItem("professionalHistoryString"));

    // pull professionalHistory from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/professionalHistoryArray.json"
    }).then((professionalHistory) => {
        let profHistoryArray = professionalHistory

        // get control of container to place job history with document.getElementById
        const profHistoryEl = document.getElementById("professional-history");
        
        // // assign professionalHistoryArray that is inside the professionalHistory object to a variable
        // const profHistoryArray = professionalHistory.professionalHistoryArray;
        
        
        //loop through array and populate the <section id-"professional-history"> container with each array item (job).
        for (let i = 0; i < profHistoryArray.length; i++) {
            let job = profHistoryArray[i];
        
            profHistoryEl.innerHTML += `
                <article class="job-info">
                    <h4>${job.title}</h4>
                    <h5>${job.company}</h5>
                    <p>Dates: ${job.dates}</p>
                    <h5>Responsibilies:</h5>
                    <p>${job.responsibilities}</p>
                </article>
                <hr>
                `
        
        }
    })
}

module.exports = populateResume

},{}]},{},[11]);
