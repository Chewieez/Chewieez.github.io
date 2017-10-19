// selecting the HTML container to place my javascript code and assigning it to a variable
let blogViewEl = document.getElementById("blog-view");
let blogEntriesEl = document.getElementById("blog-entries-list"); 

let importedBlog = JSON.parse(localStorage.getItem("blogPosts"));
console.log("importedBlog", importedBlog)


// looping over object (importedBlog) to get access to its content
for (let key in importedBlog) {
    let blogPostsArray = importedBlog[key];

// looping through the array of blog posts that was extraced from the object (importedBlog) 
    for (let i = 0; i < blogPostsArray.length; i++) { 
        let eachBlog = blogPostsArray[i];
        
// populating the html container with each blog post data 
        blogViewEl.innerHTML += `
        <article  id="blogPost-${eachBlog.id}">
                <h4 class="blog-title">${eachBlog.title}</h4>
                <p class="blog-subheading"><span class="special-text">by:</span> ${eachBlog.author}    <span class="special-text">published on:</span> ${eachBlog.published}</p>
                <br>
                <p class="blog-content">${eachBlog.content}</p>
                <br>
                <p class="blog-tags">tags: ${eachBlog.tags}</p>
        </article>
        <hr>
        `

        blogEntriesEl.innerHTML += `
        <p><a href="#">${eachBlog.published}</a></p>
        `
    } 
}