document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if(message) {
            addMessage('user', message);
            simulateTypingIndicator();
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage('chatbot', response);
                removeTypingIndicator();
            }, 1000); // Simulate chatbot typing delay
            userInput.value = ''; // Clear input after sending
        }
    }

    function addMessage(author, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', author);
        messageElement.innerHTML = `<span>${author === 'user' ? 'You' : 'Chatbot'}:</span> ${message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function simulateTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            messagesContainer.removeChild(typingIndicator);
        }
    }

    function generateResponse(input) {
        // Enhanced response logic
        if (input.toLowerCase().includes("hello")) {
            return "Hello! How can I support you today?";
        } else if (input.toLowerCase().includes("anxious")) {
            return "It's okay to feel anxious. Let's try some deep breathing together.";
        } else if (input.toLowerCase().includes("depressed")) {
            return "I'm here for you. Would you like to talk about what's been on your mind?";
        } else {
            return "I want to understand better. Could you tell me more?";
        }
    }
});
