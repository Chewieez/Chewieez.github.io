const blogPosts = {};
const blogArray = [];

let post1 = {
    "title": "First Week at Nashville Software School",
    "date": "Sun Oct 07 2017",
    "author": "Greg Lawrence",
    "tags": "NSS",
    "content": "<p>Well after years of contemplating a career change and years of thinking of learning software development, I have finally taken a huge step on that journey. This past week was my first week of school (sounds so weird) at the <a href='http://www.nashvillesoftwareschool.com' target='_blank'>Nashville Software School</a> (NSS). This is a 6 month accelerated adult education program that teaches Full Stack Web Development. The hope is to learn enough in the next 6 months to land a job in Nashville in web development this coming summer.</p><p>To try and make sure that web development was something that interested me I started the <a href='http://freecodecamp.org' target='_blank'>freeCodeCamp.com</a> curriculum back in May of this year. I put a lot of hours into that over the months before being accepted in the NSS. I quickly found that I did enjoy it, even when it was quite challenging.I assumed that this work would be great preparation for NSS.After a week at NSS, I am very grateful to have put that time in. I was fortunate to be exposed to many technologies and methods that were taught this first week at NSS.This has kept me from feeling too overwhelmed so far. I know the time is coming, probably soon, where I will be 'in over my head' at NSS and feel stressed out and lost.I need to start getting to know the instructor Steve Brownlee, assistant instructor Meg Ducharme and TA, Jared Fuller better by going and asking one on one questions. So far I’ve met with Jared a few times to ask his opinion on my code or my process. All the instructors have put a big emphasis on not being afraid to ask questions and getting comfortable being uncomfortable. During my work on the freeCodeCamp challenges and projects, I have felt that frustration of being lost in a concept and not even knowing where to bring searching, or reading documentation on MDN and still being lost, or feeling more lost after reading those docs. I’m excited to have a community around me at NSS of classmates and instructors to go to for help and support. I need to start leaning on them though and not wait too long into the program. </p><p>I’ve been surprised at how quickly friendships are being made in our class. It’s been really great. I’m not usually someone who makes quick friends or who can be outgoing in new situations when around new people. But everyone has been very warm and supportive, from our class and the other classes at NSS. I think there are 2 other cohorts right now that are at NSS, cohorts 20 and 21. We are cohort 22 and cohort 23 should be starting 5 weeks. Going into day 2 I thought I should sit in a new seat to give myself the opportunity to meet more of my classmates. I also assumed that other students would do this too. It turned out that only about 3 or 4 of us sat in a different seat and then I felt guilty that someone may think that I stole their seat. On day 3 and every day since, I’ve sat in the same place and gotten to know those sitting around me better. We’ve already been placed into small groups, mainly with those that are sitting near each other. We haven’t been assigned a group project yet but have been told we will do several.</p><p>As for projects and work, so far we’ve worked on a handful of javascript exercises, which we do locally and then push up to our github account. We’ve also started working on our portfolio website and learned how github provides a nice project management tool similar to a Trello board where we can manage tickets and to-do items. I had a hard time deciding how to start this project. I wasn’t sure if I should start from scratch and try and build the whole site without a template or if I should take some of my work from my other portfolio page to get me started or if I should just find an online template that I liked and start from that.  I made a one page portfolio page in my freeCodeCamp work so I ended up borrowing some of my formatting and layout from that page and splitting it out into separate pages for things like my resume, blog, contact info and portfolio. When I came in early Friday morning, I thought I would look online for an inspiration template and redesign my index.html page. I found an image I liked and started working on it, then Steve came in and said he gave us 4 more tickets for this project and I thought, hmm I should probably just stick with what I have at the moment and work through the rest of my current tickets (4 or 5) so I can get to working on these four new tickets. So, I have a decent start to a website now and I’m planning to maybe redesign the main site layout and the color scheme at a later time. </p><p>I really enjoyed this first week of school. It’s a bit strange to be back in school. I have not been in a school environment since I graduated college in 2000. Now I have two children who are in school (7 and 5 years old) who ask me how my day at school was and ask great questions about my school and classroom and classmates. Wow, what a feeling to hear such young children be so interested in me. As a parent you can get so wrapped up on caring for your children, it’s sometimes strange to realize that they also care for you and are curious about what you’re doing.</p><p>Tomorrow starts my second week at NSS and I’m excited to see what I learn! I will be summarizing things here on this blog weekly or hopefully more often than that. Til next time….</p>"
}

let post2 = {
    "title": "Test a second blog post",
    "date": "Sun Oct 13 2017",
    "author": "Greg Lawrence",
    "tags": "NSS",
    "content": "<p>Testing where my second blog post will be placed. I changed the database structure to include an array and use shift() to push each new blog post to the beginning of the array so the posts are populated on the page in reverse chonological order.</p>"
}

// using .unshift() instead of push() to place each new blog posts at the beginning of the array so the most recent blog post will always be at index 0. Then older posts will be posted in reverse chronological order

blogArray.unshift(post1);
blogArray.unshift(post2);

// assigning array to a property inside of blogPosts
blogPosts.blogEntries = blogArray;

// Setting the database in local storage
localStorage.setItem("blogPosts", JSON.stringify(blogPosts));


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
        <article  id="${eachBlog.date}">
                <h4 class="blog-title">${eachBlog.title}</h4>
                <p class="blog-subheading"><span class="special-text">by:</span> ${eachBlog.author}    <span class="special-text">published on:</span> ${eachBlog.date}</p>
                <br>
                <p class="blog-content">${eachBlog.content}</p>
                <br>
                <p class="blog-tags">tags: ${eachBlog.tags}</p>
        </article>
        `

        blogEntriesEl.innerHTML += `
        <p><a href="#">${eachBlog.date}</a></p>
        `
    } 
}


