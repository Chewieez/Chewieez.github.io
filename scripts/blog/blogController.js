//const paginate = require("../pagination")
//const blogComponent = require("./createBogComponent")
const blogFactory = require("./factory")
const populate = require("./populate")
const addListeners = require("./addListeners")


const blogController = Object.create(null, {
    "init": {
        value: function () {
            
            blogFactory.retrieveAll().then(blogs => {
        
                blogs.sort((a, b) => {
                    return b.published - a.published
                })
                populate(blogs)
                addListeners()
                // paginate.itemsToPaginate = blogs
                // paginate.start(".blog__paginator", ".blog__articles", blogComponent)
            })
            //filter.init()
        }
    }
    // create methods for pagination here or create a separate pagination controller
})

module.exports = blogController