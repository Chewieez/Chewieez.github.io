

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