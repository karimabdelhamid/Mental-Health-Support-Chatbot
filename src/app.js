document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    // Predefined responses
    const responses = [
        "I'm here to talk. What's on your mind?",
        "Can you tell me more about that?",
        "It's okay to feel upset. I'm here to listen.",
        "How long have you been feeling this way?",
        "I'm sorry to hear that. Do you want to discuss it in more detail?",
        "Sometimes talking about it can bring some relief. I'm here for you.",
        "That sounds really challenging. What do you think would help you feel better?",
        "Thank you for sharing that with me. If you'd like, tell me more.",
        "It's important to take things one step at a time. What's the first thing you want to address?",
        "I'm here to support you through this."
    ];

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
            setTimeout(() => {
                const response = getRandomResponse();
                addMessage('chatbot', response);
                removeTypingIndicator();
            }, 1000); // Simulate chatbot thinking delay
            userInput.value = ''; // Clear input after sending
        }
    }

    function getRandomResponse() {
        // Randomly choose a response from the predefined responses array
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function addMessage(author, message) {
        // Creates a new message element and appends it to the messages container
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', author);
        messageElement.innerHTML = `<span>${author === 'user' ? 'You' : 'Chatbot'}:</span> ${message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
    }

    function simulateTypingIndicator() {
        // Creates a typing indicator to simulate the chatbot typing a response
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
    }

    function removeTypingIndicator() {
        // Removes the typing indicator once the chatbot response is ready
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            messagesContainer.removeChild(typingIndicator);
        }
    }
});
