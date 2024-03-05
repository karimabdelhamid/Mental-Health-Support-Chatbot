document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    const responses = [
        "Tell me more about how you're feeling.",
        "It sounds like a difficult time for you. How can I assist you further?",
        "I'm really sorry to hear that. Do you want to talk about it?",
        "I'm here to listen. What happened that made you feel this way?",
        "Talking about things can sometimes make you feel better. I'm here for you.",
        "It's important to try to stay positive, even though it's not easy.",
        "Can you describe your feelings a bit more?",
        "I may be just a chatbot, but I want to help you if I can.",
        "Life can be tough sometimes, but I believe in you.",
        "Let's try to find a way to improve how you're feeling, together."
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
            }, 1000);
            userInput.value = ''; // Clear the input after sending
        }
    }

    function getRandomResponse() {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    function addMessage(author, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', author);
        messageElement.textContent = `${author === 'user' ? 'You' : 'Chatbot'}: ${message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function simulateTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.id = 'typing-indicator';
        typingIndicator.textContent = 'Chatbot is typing...';
        messagesContainer.appendChild(typingIndicator);
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            messagesContainer.removeChild(typingIndicator);
        }
    }
});
