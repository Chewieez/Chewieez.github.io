// creates a blog object that will hold blog entries and contains methods that pertain to handling blog entries

const populate = require("./populate")

const firebaseURL = "https://personal-site-60774.firebaseio.com/blogArray"


const blogFactory = Object.create(null, {
    "blogCache": {
        "value": null,
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
        }
    },
    "retrieveAll": {
        "value": function () {
            // pull blogs from Firebase
            return $.ajax({
                "url": `${firebaseURL}.json`
            }).then( blogDatabase => {
                // assign blog posts to this object for caching, convert object of object from Firebase into an array
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
        "value": function (blog, id){
            // insert function to edit a blog post on Firebase
            return $.ajax({
                "url": `${firebaseURL}/${id}/.json`,
                "method": "PUT",
                "data": JSON.stringify(blog)
            })
        },
    },
    "delete": {
        "value": function(id) {
            // insert function to write new blog to Firebase and pass in the id of the blog entry to delete
            return $.ajax({
                "url": `${firebaseURL}/${id}/.json`,
                "method": "DELETE",
            })
        }
    }
})

module.exports = blogFactory