// index.js
$(document).ready(function() {
    // Handle form submission
    $("#loginForm").submit(function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Get the username and password
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        // Basic validation
        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        // Store the username in sessionStorage
        sessionStorage.setItem("username", username);

        // Optionally log the username (you can remove this in production)
        console.log("Username stored in sessionStorage: " + username);

        // Now you can submit the form (or use AJAX to submit it if needed)
        this.submit();  // You can replace this with AJAX if you prefer not to reload the page
    });
});


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    // Event listener for form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get the username entered by the user
        const username = document.getElementById('usernameInput').value.trim();

        // If the username is not empty, store it in sessionStorage and redirect
        if (username) {
            sessionStorage.setItem('username', username);
            window.location.href = '/chat'; // Redirect to the chat page
        } else {
            alert("Please enter a username.");
        }
    });
});
