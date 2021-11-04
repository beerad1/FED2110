// These functions import functions (getUser, deletePost, displayUserOnPost) from the ajax.js and users.js file.
import { getUser, deletePost, editPost } from "./ajax.js";
import { displayUserOnPost } from "./users.js";

// This is the major function that iterates through a for loop and creates the post card for each post that will be displayed on screen. It takes the posts objects from the firebase, and uses the information therein to populate all relevant data throughout. It also contains the delete and edit functions for the posts.
export function displayPosts(posts) {
    // This section of the function creates a reference variable for the textPostBlock class.
    const postsSection = document.querySelector("#textPostBlock");
    // This ensures that the postsSection is empty.
    postsSection.innerHTML = "";
    // This is the for loop that iterates through each post to be displayed on user login, as per the main.js file. It uses string interpolation to establish the name, username, post contents, post date, and the post.id itself, which is used to target the post in the following functions (note: the likes and comments in this loop are created by the getRandomInt function in the helpers.js module).
    posts.forEach(post => postsSection.innerHTML += `
        <section class="postCard">
            <div class="pnhBundlePost">
                <div><span class="profImgPost"></span></div>
                <div id="nameHandle">
                    <!-- getUser is passed the userId the function displayUserOnPost, and the post id to be able to display the user's name, and their username on the post card. -->

                    <h4 class="pnhNameTextPost" id="fullname${post.id}">${getUser(post.userId, displayUserOnPost, post.id)}</h4>
                    <p class="pnhHandTextPost" id="username${post.id}">${getUser(post.userId, displayUserOnPost, post.id)}</p>
                </div>
            </div>
            <div>
                <p class="postText">${post.body}</p>
                <p class="postText">${post.date.toLocaleString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                })}</p>
            </div>
            <div class="postFooter">
                <span class="like-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f5f5f5"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>Likes</svg>${post.likes}</span>
                <span class="comment-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#f5f5f5"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 17.17L18.83 16H4V4h16v13.17zM20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"/>Comments</svg>${post.comments}</span>
                <fieldset class="post-btn-group" id=${post.id}>
                    <input type="button" class="edit-btn" value="EDIT"></button>
                    <input type="button" class="delete-btn" value="DELETE"></button>
                </fieldset>
            </div>
        </section>              
    `);

    // This section executes the deletePost function on click of the delete button, after identifying the post by the id.
    postsSection.addEventListener('click', (event) => {
        // If statement confirms the click target is the delete button.
        if(event.target && event.target.matches(".delete-btn")) {
            // This searches for the closest parent above the edit button that is a fieldset tag, and identifies the postId from that tag's id.
            const postId = event.target.closest("fieldset").id;
            // If true, the function is executed with the postId argument.
            deletePost(postId);
        }
    })

    // This section will execute the editPost function on click of the delete button, after identifying the post by the id. Currently, this function is replaced by a console.log of the post's id while it is being created.
    postsSection.addEventListener('click', (event) => {
        // If statement confirms the click target is the edit button.
        if(event.target && event.target.matches(".edit-btn")) {
            // This searches for the closest parent above the edit button that is a fieldset tag, and identifies the postId from that tag's id.
            // const postId = event.target.closest("fieldset").id;
            // If true, the function will be executed with the postId argument.
            
            // pop an edit window,
            // and execute editpost with the contents on click of the post button

            // establishes the 
            const modal = document.getElementById("mobilePostBox");

            // Get the <span> element that closes the modal
            const span = document.getElementById("close");

            // When the user clicks the button, open the modal 
            modal.style.display = "block"

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
            }

            


            // This executes the post edit command in ajax
            // editPost(postId);
        }
    })
}