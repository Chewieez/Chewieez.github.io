

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