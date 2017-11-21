(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Blogs = require("./blog/blogInit.js")

function addListenersNav() {
    // debugger
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
                Blogs.retrieve(Blogs.populate)
            }
        }
    })

}

module.exports = addListenersNav
},{"./blog/blogInit.js":2}],2:[function(require,module,exports){


const Blogs = Object.create(null, {
    "blogEntries": {
        "value": {},
        "writable": true
    },
    "write": {
        "value": {},
    },
    "retrieve": {
        "value": function(callback) {
            // pull blogs from Firebase
            $.ajax({
                "url": "https://personal-site-60774.firebaseio.com/blogArray.json"
            }).then( blogDatabase => {
                // assign blog posts to this object
                this.blogEntries = blogDatabase

                if (callback) {
                    callback()
                }
            })
        }
    },
    "populate": {
        "value": () => {
            const blogViewEl = document.getElementById("blog-view")
            
            Blogs.blogEntries.forEach(currentBlog => {
                // use Moment.js to format published date and store in a variable
                //let currentBlogPublishedDate = moment(currentBlog.published).format("dddd, MMMM Do YYYY")
                let currentBlogPublishedDate = currentBlog.published

                blogViewEl.innerHTML += `
                <article  id="blogPost-${currentBlog.id}">
                        <h4 class="blog-title">${currentBlog.title}</h4>
                        <p class="blog-subheading"><span class="special-text">by:</span> ${currentBlog.author}    <span class="special-text">published on:</span> ${currentBlogPublishedDate}</p>
                        
                        `
                // check if the content for the blog post is created than 470 characters. If it is 
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
            })
        },
    },
    "edit": {
        "value": {},
    }
})
//
module.exports = Blogs
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const addListenersNav = require("./addListenersNav")
const populateProjects = require("./projects/projects-controller")
const populateContactInfo = require("./contact/contact")
const populateResume = require("./resume/resume-controller")
const Blogs = require("./blog/blogInit")


addListenersNav()
populateProjects()
populateContactInfo()
populateResume()

Blogs.retrieve()

},{"./addListenersNav":1,"./blog/blogInit":2,"./contact/contact":3,"./projects/projects-controller":5,"./resume/resume-controller":6}],5:[function(require,module,exports){


function populateProjects() {
    // pull project data from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/projectsArray.json"
    }).then((projects) => {
        const projectsArray = projects

        // grab control of HTML container with document.getElementById()
        let portfolioEl = document.getElementById("portfolio")

        // loop through arrays in object
        projectsArray.forEach(project => {

            // populate html container variable with project content
            portfolioEl.innerHTML += `
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
    })
}

module.exports = populateProjects
},{}],6:[function(require,module,exports){

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

},{}]},{},[4]);
