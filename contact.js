const contactInfo = {};

const twitterInfo = {
    "socialPlatform": "Twitter",
    "username": "@gregaudio",
    "url": "http://www.twitter.com/gregaudio",
    "icon": "/images/Twitter_Logo_Blue.png",
}

const linkedInInfo = {
    "socialPlatform": "LinkedIn",
    "username": "gregmlawrence",
    "url": "https://www.linkedin.com/in/gregmlawrence/",
    "icon": "/images/In-2C-54px-R.png",
}

const emailInfo = {
    "name": "Greg Lawrence",
    "emailAddress": "gregaudio@gmail.com",
    "icon": "/images/logo_gmail_48px.png"
}

contactInfo.twitterInfo = twitterInfo;
contactInfo.linkedInInfo = linkedInInfo;
contactInfo.emailInfo = emailInfo;

let contactInfoString = JSON.stringify(contactInfo);
localStorage.setItem("contactInfo", contactInfoString);

