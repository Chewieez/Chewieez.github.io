// creates a blog object that will hold blog entries and contains methods that pertain to handling blog entries

const addListeners = require("./addListeners")
const populate = require("./populate")

const firebaseURL = "https://personal-site-60774.firebaseio.com/blogArray"


const blogFactory = Object.create(null, {
    "blogCache": {
        "value": {},
        "writable": true
    },
    "write": {
        "value": function (blog) {
            // insert function to write new blog to Firebase
            return $.ajax({
                "url": `${firebaseURL}/.json`,
                "method": "POST",
                "data": JSON.stringify(blog)
            })
            // .then((blogs)=>{
            //     populate(blogs)
            //     addListeners(blogs)
            // })
        },
    },
    "retrieveAll": {
        "value": function () {
            // pull blogs from Firebase
            return $.ajax({
                "url": `${firebaseURL}.json`
            }).then( blogDatabase => {
                // assign blog posts to this object
                //this.blogCache = blogDatabase
                this.blogCache = Object.keys(blogDatabase)
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