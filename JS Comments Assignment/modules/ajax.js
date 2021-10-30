// These import functions import methods (getRandomInt, guidGenerator, currentUser, displayPosts) from the helpers.js, users.js, and posts.js modules.
import { getRandomInt, guidGenerator } from "./helpers.js";
import { currentUser } from "./users.js";
import { displayPosts } from "./posts.js";

// These variables break the filepath that will be used in conjuction with the firebase into the main body of the address, and the .json extension. While it is more characters to use string interpolation (`${ext}` vs. `.json`) in this instance, this is a good way to save time, should the appended info become longer in the future.
const baseUrl = "https://ajax-crud-practice-fed2110-default-rtdb.firebaseio.com/";
const ext = '.json';

// This exported function takes the value of the text typed into the input tag with the name "username", and checks this value against all users in the firebase. If it exists, then it logs the user in. Otherwise it prints to console "User not found."
export function loginUser(callback) {
    $.get({
        // Instantiates the url of the firebase users section.
        url: `${baseUrl}users${ext}`,
        // Declares the success through an arrow function using the response.
        success: (response) => {
            // Sets $username to the value input through the username input tag.
            const $username = $("[name='username']").val();
            // Checks user for true or false, while preventing a null value in return using "!!".
            const allUsers = response.filter((user) => !!user);
            // Checks through all existing usernames, and verifies that the one entered exists.
            const user = allUsers.find(user => user.username === $username);
            // If/Else that displays in console whether the username was found to exist, or not.
            if(user) {
                // If user is found, execute callback with user as argument.
                callback(user);
                // Executes the getPosts function, with displayPosts as argument.
                getPosts(displayPosts);
                // Sets display value on .newsfeed css to flex.
                $(".newsfeed").css("display", "flex");
                // Sets display value on .new-post css to grid.
                $(".new-post").css("display", "grid");
                // Sets display value on .login-section css to none.
                $(".login-section").hide();
            }else{
                // If user is not found.
                console.log("User not found.")
            }
        }
    })
};

// This exported function retrieves all posts in the firebase, and displays them starting with most recent at the top.
export function getPosts(callback = console.log) {
    $.get({
        // Instantiates the url of the firebase, posts section.
        url: `${baseUrl}posts${ext}`,
        // Declares the success through an arrow function using the response (res).
        success: (res) => {
            // Creates variables keys using "object.keys()" to make an array of the names of all posts.
            let keys = Object.keys(res);
            // Creates variable posts to map all properties of posts aside from the post name.
            let posts = keys.map(key => {
                return res[key];
            // Sorts posts by the most recent date. Sets the time of posts to the Date() format, and subtracts newest from oldest.
            }).sort((a, b) => new Date(b.date) - new Date(a.date));
            // Performs same function as console.log(posts).
            callback(posts); 
        },
        // Posts error to console.
        error: error => console.log(error) 
    })
};

// This exported function is used by the posts.js module to return the name and username of the user that created the targeted post.
export function getUser(userId, callback = console.log, postId) {
    $.get({
        // Declares url from firebase to users section, and specifically the userId of the targeted post.
        url: `${baseUrl}users/${userId}${ext}`,
        // On success, executes callback passing user and postId.
        success: user => {
            callback(user, postId);
        },
        // On fail, console.log the error.
        error: error => console.log(error) 
    })
};

// This exported function allows the creation of new posts using the value of #new-post-text, and the currentUser.
export function createPost(callback = console.log) {
    // Uses guidGenerator to create uniqe id for the post object in firebase.
    const newId = guidGenerator();
    // Creates the new post object.
    const newPost = {
        // This declares that the new object will start as an empty object, and then be filled with the values from the textarea, the current date from Date(), currentUser.id, randomly generated like and comment amounts, and the newly generated guid.
        [newId]: {
            body: $("#new-post-text").val(),
            date: new Date(),
            // Brings id from user object for the user that is currently logged in.
            userId: currentUser.id,
            likes: getRandomInt(1, 100),
            comments: getRandomInt(1, 25),
            id: newId
        }
    };
    // Patches the new post to the firebase, using the firebase url for the posts section, and the stringified newPost object.
    $.ajax({
        type: "PATCH",
        // Declares url from firebase to posts section.
        url: `${baseUrl}posts${ext}`,
        // Converts to a json string, that can be interpreted.
        data: JSON.stringify(newPost),
        // On success, the getPosts function is executed to display the new post without a refresh, so as to prevent the user from having to log back in.
        success: () => {
            getPosts(callback);
            // This resets the textarea so a new post can be created without having to delete the old text.
            $("#new-post-text").val("");
        },
        // On fail, console.log the error.
        error: err => console.log(err)
    })
};

// This exported function allows for posts to be deleted from the firebase, and summarily from the newsfeed section.
export function deletePost(postId) {
    // This ajax call executes the delete request, of the targeted post based on the postId.
    $.ajax({
        // Declares Delete type HTTP method.
        type: "DELETE",
        // Declares url from firebase to posts section, and thto the specific post by the postId.
        url: `${baseUrl}posts/${postId}${ext}`,
        // On success, the getPosts callback function is executed to displayPosts. Shows the newsfeed after deleting without a refresh, so as to prevent the user from having to log back in.
        success: () => {
            getPosts(displayPosts);
        },
        // On fail, console.log the error.
        error: err => console.log(err)
    })
};