// create variable to hold the contact info retreived from Firebase
let retrievedContactInfo;

/* OLD CODE FROM BEFORE SWITCHING TO FIREBASE FOR DB */
/*
// const twitterInfo = {
//     "socialPlatform": "Twitter",
//     "username": "@gregaudio",
//     "url": "http://www.twitter.com/gregaudio",
//     "icon": "/images/Twitter_Logo_Blue.png",
// }

// const linkedInInfo = {
//     "socialPlatform": "LinkedIn",
//     "username": "gregmlawrence",
//     "url": "https://www.linkedin.com/in/gregmlawrence/",
//     "icon": "/images/In-2C-54px-R.png",
// }

// const githubInfo = {
//     "socialPlatform": "GitHub",
//     "username": "Chewieez",
//     "url": "https://github.com/Chewieez",
//     "icon": "/images/GitHub-Mark-64px.png"    
// }

// contactInfo.twitterInfo = twitterInfo;
// contactInfo.linkedInInfo = linkedInInfo;
// contactInfo.githubInfo = githubInfo;

// // convert data object to string and store in local storage
// let contactInfoString = JSON.stringify(contactInfo);
// localStorage.setItem("contactInfo", contactInfoString);

*/


function populateContactInfo () {
    // Pull data from Firebase
    $.ajax({
        "url": "https://personal-site-60774.firebaseio.com/contactInfo.json"
    }).then ((contactInfo) => {
        retrievedContactInfo = contactInfo

        // create a empty string to start building up with contact info, to later place in DOM
        let contactInfoString = "";

        // loop through retreived data from local storage
        for (let key in retrievedContactInfo) {
            let individualContactInfo = retrievedContactInfo[key]
            
            contactInfoString += `
            
            <p><img src="${individualContactInfo.icon}" width="50px" alt="${individualContactInfo.socialPlatform} title="${individualContactInfo.socialPlatform}"/> <a href="${individualContactInfo.url}">${individualContactInfo.username}</a></p>
            `
            
        }
        
        // get element from DOM to place contact data
        let contactDomEl = document.getElementById("contact-list");
        // place the built contact Info string into DOM
        contactDomEl.innerHTML = contactInfoString;
    })

}


module.exports = populateContactInfo