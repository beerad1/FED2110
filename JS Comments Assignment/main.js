//Imports functions (displayPosts, createPost, loginUser, and saveUser) from the posts.js, users.js, and ajax.js modules.
import { displayPosts } from './modules/posts.js';
import { createPost, loginUser } from './modules/ajax.js';
import { saveUser } from './modules/users.js';

// This is the main js file IIFE, it executes on page load, and immediately begins waiting for the user to enter login infoand click the login button.
(function(){
    // When the user clicks the login button, the login user function is invoked and uses the saveUser function to apply currentUser to the current session.
    $("#login-btn").click(() => loginUser(saveUser));
    // Upon clicking the post buton, the contents of the textarea will be added to the firebase with the relevant post data and the posts will be reloaded without a page refresh.
    $("#post-btn").click(() => createPost(displayPosts));
    // getPosts(displayPosts);
})();

