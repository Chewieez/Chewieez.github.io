//const paginate = require("../pagination")
//const blogComponent = require("./createBogComponent")
const blogFactory = require("./factory")
const populate = require("./populate")
const addListeners = require("./addListeners")

const blogController = Object.create(null, {
    "init": {
        value: function () {
            
            blogFactory.retrieveAll().then(blogs => {
                console.log(blogs)
                blogs.sort((a, b) => {
                    return b.published - a.published
                })
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