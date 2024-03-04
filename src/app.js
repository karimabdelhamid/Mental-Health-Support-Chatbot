document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', event => event.key === 'Enter' && sendMessage());

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            simulateTypingIndicator();
            setTimeout(() => {
                const response = generateResponse(message);
                addMessage('chatbot', response);
                removeTypingIndicator();
            }, 1000);
            userInput.value = '';
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
        // Responses focused on Takotsubo cardiomyopathy
        input = input.toLowerCase();
        if (input.includes("hello")) {
            return "Hello! I'm here to support you. If you're feeling overwhelmed, let's talk about it.";
        } else if (input.includes("broken heart") || input.includes("takotsubo")) {
            return "Takotsubo cardiomyopathy, often called 'broken heart syndrome', is a temporary heart condition often brought on by stressful situations. Would you like to know more or discuss your feelings?";
        } else if (input.includes("symptoms")) {
            return "Symptoms of Takotsubo cardiomyopathy can mimic a heart attack and may include chest pain, shortness of breath, and an irregular heartbeat. It's important to seek medical attention if you're experiencing these symptoms.";
        } else if (input.includes("anxious") || input.includes("stressed")) {
            return "Feeling anxious or stressed can be challenging. Taking deep breaths and finding moments to relax can help. Would you like some tips on relaxation techniques?";
        } else if (input.includes("help")) {
            return "It's brave to ask for help. I'm here to listen. Talking about your experiences can be therapeutic. Additionally, reaching out to a healthcare provider can be an important step.";
        } else {
            return "I'm here to help. Can you tell me a bit more about what you're going through, or how I can assist you?";
        }
    }
});
