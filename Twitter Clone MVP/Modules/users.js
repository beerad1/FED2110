

// Creates and exports an empty object for the current user of the application
export let currentUser = {};

// This function passess the user and postId when executed in the posts.js file, after being called in main.js, to display the name and username.
export function displayUserOnPost(user, postId) {
    // The .html() gets the first html element that matches the information in the "$()". These are finding the fullname and username ids and inserting the user's name and username from the post object.
    $(`#fullname${postId}`).html(user.name);
    // The @ symbol is preplaced in this .html().
    $(`#username${postId}`).html(`@${user.username}`);
}

// This function retrieves the user object of the currently logged in user, and sets the value of the currentUser object created on this page to equal this value.
export function saveUser(user) {
    currentUser = user;
    
    // Adds user's name to various places on the page
    $("#dashText").html(user.name);
    $(".pnhNameTextPost").html(user.name);
    $("#pnhNameText").html(user.name);
    // Adds user's username to various places on the page
    $("#pnhHandText").html(`@${user.username}`);
    $(".pnhHandTextPost").html(`@${user.username}`);
    // Adds user's followers/following count(s) to the page. There is no similar code for the number of posts, as this application is not currently tracking the number of posts a user hass made.
    $("#followersNumber").html(`, ${user.followers} `);
    $("#followingNumber").html(`, ${user.following} `);
}
