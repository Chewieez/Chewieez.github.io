// creates a blog object that will hold blog entries and contains methods that pertain to handling blog entries

const addListeners = require("./addListeners")
const populate = require("./populate")

const firebaseURL = "https://personal-site-60774.firebaseio.com/blogArray"


const blogFactory = Object.create(null, {
    "blogCache": {
        "value": {},
        "writable": true,
        "enumerable": true
    },
    "write": {
        "value": function (blog) {
            // insert function to write new blog to Firebase
            return firebase.auth().currentUser.getIdToken(true).then(idToken => {
                return $.ajax({
                    "url": `${firebaseURL}/.json?auth=${idToken}`,
                    "method": "POST",
                    "data": JSON.stringify(blog)
                })
            })
        }
    },
    "retrieveAll": {
        "value": function () {
            // pull blogs from Firebase
            return $.ajax({
                "url": `${firebaseURL}.json`
            }).then( blogDatabase => {
                // assign blog posts to this object
                this.blogCache = Object.keys(blogDatabase)
                    .map(key => {
                        blogDatabase[key].id = key
                        return blogDatabase[key]
                    })
                return this.blogCache
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


module.exports = blogFactory