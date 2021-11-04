// These import functions import methods (getRandomInt, guidGenerator, currentUser, displayPosts) from the helpers.js, users.js, and posts.js modules.
import { getRandomInt, guidGenerator } from "./helpers.js";
import { currentUser} from "./users.js";
import { displayPosts } from "./posts.js";

// These variables break the filepath that will be used in conjuction with the firebase into the main body of the address, and the .json extension. While it is more characters to use string interpolation (`${ext}` vs. `.json`) in this instance, this is a good way to save time, should the appended info become longer in the future.
const baseUrl = "https://ajax-crud-practice-fed2110-default-rtdb.firebaseio.com/";
const ext = '.json';

// This exported function takes the value of the text typed into the input tag with the name "email", and checks this value against all users in the firebase. If it exists, then it logs the user in. Otherwise it prints to console "User not found."
export function loginUser(callback) {
    $.get({
        // Instantiates the url of the firebase users section.
        url: `${baseUrl}users${ext}`,
        // Declares the success through an arrow function using the response.
        success: (response) => {
            // Sets $email to the value input through the email input tag.
            const $email = $("#loginEmail").val();
            // Checks user for true or false, while preventing a null value in return using "!!". The "Object.values()" method ensures that the object data type matches the array.filter.
            const allUsers = Object.values(response).filter((user) => !!user);
            // Checks through all existing usernames, and verifies that the one entered exists.
            const email = allUsers.find(user => user.email === $email);
            // If/Else that returns the email to the callback function, changes the page CSS to the Dashboard, retrieves the post feed, and clears the #loginEmail input.
            if(email) {
                // If user is found, execute callback with user as argument.
                callback(email);
                // This changes the href attribute of the link tag determining the current page CSS, specifically from the login to the dash on a successful login attempt
                $("#CSS")[0].setAttribute("href", "/CSS/Dashboard.css");
                // Executes the getPosts function, with displayPosts as argument.
                getPosts(displayPosts);
                // This resets the form fields to be empty
                $("#loginEmail").val("");
            }else{
                // If user is not found, changes the contents of #loginEmail to empty, and alert "user not found".
                $("#loginEmail").val("");
                alert("User not found.");
            }
        }
    })
};

// This exported function sets the CSS back to the home page, and clears the currentUser object.
export function logoutUser() {
    // Set CSS to Home
    $("#CSS")[0].setAttribute("href", "/CSS/Home.css");
    // Clear currentUser
    currentUser = [currentUser];
}

// This exported function retrieves all posts in the firebase, and displays them starting with most recent at the top.
export function getPosts(callback = console.log) {
    $.get({
        // Instantiates the url of the firebase, posts section.
        url: `${baseUrl}posts${ext}`,
        // Declares the success through an arrow function using the response (res).
        success: (res) => {
            // Creates variable keys using "object.keys()" to make an array of the names of all posts.
            let keys = Object.keys(res);
            // Creates variable posts to map all properties of posts aside from the post name.
            let posts = keys.map(key => {
                return res[key];
            // Sorts posts by the most recent date. Sets the time of posts to the Date() format, and subtracts newest from oldest.
            }).sort((a, b) => new Date(b.date) - new Date(a.date));
            // Performs same function as console.log(posts).
            callback(posts); 
        },
        // Outputs error to console.
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

// This exported function allows the creation of new posts using the value of #new-post-area, and the currentUser.
export function createPost(callback = console.log) {
    // Uses guidGenerator to create unique ids for the post object in firebase.
    const newId = guidGenerator();
    // Create new date object with US format.
    const date = new Date();
    let dateUS = date.toLocaleString('en-US');
    console.log(dateUS);
    // Creates the new post object.
    const newPost = {
        // This declares that the new object will start as an empty object with it's id being the newId, and then be filled with the values from the textarea, the current date from Date(), currentUser.id, and randomly generated like and comment amounts.
        [newId]: {
            body: $("#new-post-area").val(),
            date: dateUS,
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
            // This resets the textarea.
            $("#new-post-area").val("");
        },
        // On fail, console.log the error.
        error: err => console.log(err)
    })
};

// This exported function allows the creation of new usre objects.
export function createUser() {
    // This get will check the provided new email against existing users, to ensure there are no duplicates created.
    $.get({
        // Instantiates the url of the firebase users section.
        url: `${baseUrl}users${ext}`,
        // Declares the success through an arrow function using the response.
        success: (response) => {
            // Sets each "$"variable to the corresponding input value for the name, username, and email. Password is on the html form, but is not considered at this time.
            const $newName = String($("#newFirstName").val() + " " + $("#newLastName").val());
            const $newUsername = $("#newUsername").val();
            const $newEmail = $("#newEmail").val();
            // Checks user for true or false, while preventing a null value in return using "!!". The "Object.values()" method ensures that the object data type matches the array.filter.
            const allUsers = Object.values(response).filter((user) => !!user);
            // Checks through all existing emails, and verifies that the one entered exists.
            const newEmail = allUsers.find(user => user.email === $newEmail);
            // If the value of the newEmail is not undefined (i.e., a user already has that email) then an alert will notify the user that a different email must be used.  
            if(newEmail || $newEmail == "" ) {
                alert("The email address field is not complete, or this email address is already in use. Please enter a new email address.");
            // Else that displays in console whether the newEmail is undefined, or not. The user must be unique, as duplicates will cause issues down the line.
            }else{
                // Uses guidGenerator to create unique id for the post object in firebase.
                const newId = guidGenerator();
                // Creates the new post object.
                const newUser = {
                    // This declares that the new object will start as an empty object, and then be filled with the values from the above "$" variables. Again, password is not considered at this point in time.
                    [newId]: {
                        email: $newEmail,
                        followers: getRandomInt(1000, 10000),
                        following: getRandomInt(15, 300),
                        id: newId,
                        name: $newName,
                        username: $newUsername
                    }
                };
                // Patches the new user to the firebase, using the firebase url for the users section, and the stringified newUser object.
                $.ajax({
                    type: "PATCH",
                    // Declares url from firebase to users section.
                    url: `${baseUrl}users${ext}`,
                    // Converts to a json string, that can be interpreted.
                    data: JSON.stringify(newUser),
                    // On success, the CSS changes to the Log In page, and ll values for the Sign Up page inputs are cleared.
                    success: () => {
                        // Changes CSS to Log In.
                        $("#CSS")[0].setAttribute("href", "/CSS/Log In.css");
                        // This resets the input areas for the Sign Up page.
                        $("#newFirstName").val("");
                        $("#newLastName").val("");
                        $("#newUsername").val("");
                        $("#newEmail").val("");
                        $("#newPassword").val("");
                    },
                    // On fail, console.log the error.
                    error: err => console.log(err)
                })
            }
        // On fail, console.log() the error.
        },
        error: err => console.log(err)

    });
}

// This exported function allows for posts to be deleted from the firebase, and summarily from the newsfeed section.
export function deletePost(postId) {
    // This ajax call executes the delete request, of the targeted post based on the postId.
    $.ajax({
        // Declares Delete type HTTP method.
        type: "DELETE",
        // Declares url from firebase to posts section, and to the specific post by the postId.
        url: `${baseUrl}posts/${postId}${ext}`,
        // On success, the getPosts callback function is executed to displayPosts. Shows the newsfeed after deleting without a refresh, so as to prevent the user from having to log back in.
        success: () => {
            getPosts(displayPosts);
        },
        // On fail, console.log the error.
        error: err => console.log(err)
    })
};

// This exported function allows for posts to be edited in the firebase, and summarily in the newsfeed section.
export function editPost(postId) {
    // This ajax call executes the edit request, of the targeted post based on the postId.
    $.ajax({
        // Declares PATCH type HTTP method.
        type: "PATCH",
        // Declares url from firebase to posts section, and to the specific post by the postId.
        url: `${baseUrl}posts/${postId}${ext}`,
        // On success, the getPosts callback function is executed to displayPosts. Shows the newsfeed after deleting without a refresh, so as to prevent the user from having to log back in.
        success: () => {
            getPosts(displayPosts);
        },
        // On fail, console.log the error.
        error: err => console.log(err)
    })
};
