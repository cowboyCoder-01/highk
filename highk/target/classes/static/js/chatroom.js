let stompClient = null;
const messagesContainer = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

// Function to establish WebSocket connection
function connect() {
    const socket = new SockJS('/chat');  // Connect to the WebSocket server
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        // Subscribe to the /topic/messages to receive new ChatMessage objects from the server
        stompClient.subscribe('/topic/messages', function (messageOutput) {
            const chatMessage = JSON.parse(messageOutput.body);
            displayMessage(chatMessage);  // Display received ChatMessage
        });
    });
}

// Function to send a ChatMessage to the server
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return; // Don't send empty messages

    // Retrieve the username from sessionStorage
    const username = sessionStorage.getItem('username');
    if (!username) {
        alert("You must log in first.");
        window.location.href = '/';  // Redirect to login page if no username is found
        return;
    }

    const chatMessage = {
        user: username,  // Use the actual logged-in username
        text: messageText,
        time: new Date().toLocaleTimeString()
    };

    // Send the ChatMessage object to the server
    stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));

    // Clear input field
    messageInput.value = '';
}

// Display received ChatMessage in the UI
function displayMessage(chatMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');

    // Retrieve your username from session storage
    const currentUser = sessionStorage.getItem('username');

    // Check if the message is from you
    if (chatMessage.user === currentUser) {
        messageContent.classList.add('my-message');
    } else {
        messageContent.classList.add('other-message');
    }

    messageContent.innerHTML = `
        <span class="user">${chatMessage.user}</span>
        ${chatMessage.text}
        <span class="timestamp">${chatMessage.time}</span>
    `;

    messageDiv.appendChild(messageContent);
    messagesContainer.appendChild(messageDiv);

    // Auto-scroll to the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


// Event listener for submitting the message form
chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
});

function goBack() {
    window.location.href = '/dashboard';
}

// Initialize connection
connect();
