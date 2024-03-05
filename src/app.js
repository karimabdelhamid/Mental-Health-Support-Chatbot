document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            simulateTypingIndicator();
            // Send the message to the server and wait for a response
            callChatApi(message).then(response => {
                addMessage('chatbot', response);
                removeTypingIndicator();
            }).catch(error => {
                console.error('Error:', error);
                addMessage('chatbot', "Sorry, I'm having trouble understanding you right now. Please try again later.");
                removeTypingIndicator();
            });
            userInput.value = ''; // Clear the input after sending
        }
    }

    function addMessage(author, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', author);
        messageElement.innerHTML = `<span>${author === 'user' ? 'You' : 'Chatbot'}:</span> ${message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto scroll to the latest message
    }

    function simulateTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingIndicator);
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            messagesContainer.removeChild(typingIndicator);
        }
    }

    function callChatApi(message) {
        // This is where you would replace with your actual chat service endpoint
        const chatServiceEndpoint = 'https://karimabdelhamid.github.io/Mental-Health-Support-Chatbot/'; // Placeholder URL

        return fetch(chatServiceEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(data.reply) {
                return data.reply;
            } else {
                throw new Error('Reply not found in response');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return "Sorry, I couldn't get a response. Please try again later.";
        });
    }
});
