//Imports functions (displayPosts, createPost, loginUser, and saveUser) from the posts.js, users.js, and ajax.js modules.
import { displayPosts } from './Modules/posts.js';
import { createPost, createUser, loginUser, logoutUser } from './Modules/ajax.js';
import { saveUser } from './Modules/users.js';

// This is the main js file IIFE, it executes on page load, and immediately begins waiting for the user to enter login info and click the login button.
(function(){
    // This click listener waits for the login button on the home page to take a user to the Log In page
    $("#loginPageBtn").click(() => {
        $("#CSS")[0].setAttribute("href", "/CSS/Log In.css");
    });
    // This click listener waits for the signup button on the home page to take a user to the Sign Up page 
    $("#signupPageBtn").click(() => {
        $("#CSS")[0].setAttribute("href", "/CSS/Sign Up.css");
    });
    // This click listener waits for the signup button on the Sign Up page to take a user to the Log In page
    $("#signupBtn").click(createUser);
    // When the user clicks the login button, the login user function is invoked and uses the saveUser function to apply currentUser to the current session.
    $("#loginBtn").click(() => loginUser(saveUser));
    // This is the listener for when the user clicks the new post button on obile.
    $("#newPostIcon").click(() => {
        $("#mobilePostBox")[0].setAttribute("display", "flex");
    });
    // Upon clicking the post buton, the contents of the textarea will be added to the firebase with the relevant post data and the posts will be reloaded without a page refresh.
    $("#postButton").click(() => createPost(displayPosts));
    // Executes the logoutUser function on click.
    $(".logoutBtn").click(logoutUser);
})();

