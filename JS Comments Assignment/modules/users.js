// This was used to import the user info stored in the other users.js file, but now that we are using firebase fro this purpose, this is a deprecated function.
import { users } from "../users.js";

// Creates and exports an empty object for the current user of the application
export let currentUser = {};

// This is another deprecated function that is no longer needed by the application. It's purpose was to create a user object from thenow defunct users.js, not the critical users.js module.
export class CreateUser {
    // Pulled first, last and user name data from the objects in the defunct users.js file and created a new user for the twitter clone from this data.
    constructor(firstName, lastName, username) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
};

// This function was used to confirm the existence of an exact user id in the defunct users.js file, and return the value.
// export function getUser(userId) {
//     return users.find(user => user.id === userId);
// };

// This function passess the user and postId when executed in the posts.js file, after being called in main.js, to display the name and username.
export function displayUserOnPost(user, postId) {
    $(`#fullname${postId}`).html(user.name);
    // The @ symbol is preplaced in this .html().
    $(`#username${postId}`).html(`@${user.username}`);
}

// This function retrieves the user object of the currently logged in user, and sets the value of the currentUser object created on this page to equal this value.
export function saveUser(user) {
    currentUser = user;
}
