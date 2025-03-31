// Global variables
let userType = 'user';
let chatHistory = [];

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');
const userTypeButtons = document.querySelectorAll('.user-type-btn');

// Check for saved history in localStorage
if (localStorage.getItem('aaskAIChatHistory')) {
    try {
        chatHistory = JSON.parse(localStorage.getItem('aaskAIChatHistory'));
        renderChatHistory();
    } catch (e) {
        console.error('Error loading chat history:', e);
        localStorage.removeItem('aaskAIChatHistory');
    }
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

clearHistoryBtn.addEventListener('click', clearHistory);

userTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("click")
        userTypeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        userType = button.dataset.type;

        // Add a message to inform user of the switch
        addAIMessage(`I see you're a ${userType === 'user' ? 'customer' : 'seller'}. I'll tailor my responses accordingly.`);
    });
});

// Functions
// function sendMessage() {
//     const message = chatInput.value.trim();
//     console.log(chatInput.value)
//     if (!message) return;

//     // Add user message to UI
//     addUserMessage(message);

//     // Clear input
//     chatInput.value = '';

//     // Show typing indicator
//     showThinkingAnimation();

//     // Simulate AI processing (would be replaced with actual AI API call)
//     setTimeout(() => {
//         // Remove typing indicator
//         removeThinkingAnimation();

//         // Generate AI response based on user type and message
//         const aiResponse = generateAIResponse(message);

//         // Add AI response to UI
//         addAIMessage(aiResponse);

//         // Save to history
//         saveToHistory(message, aiResponse);
//     }, 1500);
// }
async function sendMessage() {
    const message = chatInput.value.trim();
    console.log('Sending message:', message);
    
    if (!message) return;

    // Add user message to UI
    addUserMessage(message);

    // Clear input
    chatInput.value = '';

    // Show typing indicator
    showThinkingAnimation();

    try {
        // Generate AI response
        const aiResponse = await generateAIResponse(message);
        console.log('Received AI response:', aiResponse);

        // Remove typing indicator
        removeThinkingAnimation();

        // Add AI response to UI
        addAIMessage(aiResponse);

        // Save to history
        saveToHistory(message, aiResponse);
    } catch (error) {

        console.error('Error in sendMessage:', error);
        removeThinkingAnimation();
        addAIMessage('Sorry, I encountered an error. Please try again.');
    }
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

function addAIMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'ai-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

function showThinkingAnimation() {
    const thinkingElement = document.createElement('div');
    thinkingElement.classList.add('ai-thinking');
    thinkingElement.id = 'aiThinking';
    thinkingElement.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(thinkingElement);
    scrollToBottom();
}

function removeThinkingAnimation() {
    const thinkingElement = document.getElementById('aiThinking');
    if (thinkingElement) {
        thinkingElement.remove();
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function saveToHistory(userMessage, aiResponse) {
    const historyItem = {
        id: Date.now(),
        userMessage,
        aiResponse,
        timestamp: new Date().toISOString(),
        userType
    };

    chatHistory.unshift(historyItem);

    // Keep only the last 10 conversations
    if (chatHistory.length > 10) {
        chatHistory = chatHistory.slice(0, 10);
    }

    // Save to localStorage
    localStorage.setItem('aaskAIChatHistory', JSON.stringify(chatHistory));

    // Update history UI
    renderChatHistory();
}

function renderChatHistory() {
    historyList.innerHTML = '';

    if (chatHistory.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No chat history yet';
        emptyMessage.style.padding = '15px';
        emptyMessage.style.color = '#777';
        emptyMessage.style.textAlign = 'center';
        historyList.appendChild(emptyMessage);
        return;
    }

    chatHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.dataset.id = item.id;

        const message = document.createElement('p');
        message.textContent = truncateText(item.userMessage, 35);

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = formatDate(item.timestamp);

        historyItem.appendChild(message);
        historyItem.appendChild(timestamp);

        historyItem.addEventListener('click', () => {
            loadConversation(item);
        });

        historyList.appendChild(historyItem);
    });
}

function loadConversation(historyItem) {
    // Clear current chat
    chatMessages.innerHTML = '';

    // Add initial AI greeting
    const greeting = document.createElement('div');
    greeting.classList.add('message', 'ai-message');
    greeting.textContent = "Hello! I'm AaskAI, your personal assistant for Farm2Home. How can I help you today?";
    chatMessages.appendChild(greeting);

    // Add the conversation
    addUserMessage(historyItem.userMessage);
    addAIMessage(historyItem.aiResponse);

    // Switch to correct user type if needed
    if (historyItem.userType !== userType) {
        userType = historyItem.userType;
        userTypeButtons.forEach(btn => {
            if (btn.dataset.type === userType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

function clearHistory() {
    if (confirm("Are you sure you want to clear your chat history?")) {
        chatHistory = [];
        localStorage.removeItem('aaskAIChatHistory');
        renderChatHistory();
    }
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function generateAIResponse(message) {
    console.log('Generating response for message:', message);
    
    // Get CSRF token from cookie
    const csrftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    
    console.log('CSRF token:', csrftoken ? 'Found' : 'Not found');

    try {
        const response = await fetch("/asak_ai_chat/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrftoken
            },
            body: `message=${encodeURIComponent(message)}`
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        console.log('status data:', data.status);

        if (data.status === 'success') {
            return data.bot_response;
        } else {
            return data.status,'Sorry, I encountered an error. Please try again. data';
        }
    } catch (error) {
        console.error('Error in generateAIResponse:', error);
        return "Sorry, I encountered an error. Please try again. catch";
    }
}
// Simple AI response generator (would be replaced with actual AI)
// function generateAIResponse(message) {
//     fetch("/asak_ai_chat/", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'X-CSRFToken': '{{ csrf_token }}'
//         },
//         body: `user_message=${message}`
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'success') {
//                 return data.bot_response
//             } else{
//                 return data.message
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             return "Unknown Error"
//         });



//     // if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
//     //     return "Hello there! How can I assist you today with Farm2Home?";
//     // }

//     // if (lowerMessage.includes('thank')) {
//     //     return "You're welcome! Is there anything else I can help you with?";
//     // }

//     // if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
//     //     return "Goodbye! Feel free to come back if you have more questions.";
//     // }

//     // if (userType === 'user') {
//     //     if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
//     //         return "Based on your profile and preferences, I recommend trying our organic tomatoes, farm - fresh eggs, and seasonal berries.Would you like me to add any of these to your cart ?";
//     //     }

//     //     if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
//     //         return "Our prices are competitive and reflect the high quality of our farm - fresh products.We offer weekly deals and discounts for regular customers.Check our special offers section for the best deals!";
//     //     }

//     //     if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
//     //         return "We offer same - day delivery for orders placed before 11 AM, and next - day delivery for all other orders.Delivery is free for orders above ₹500. You can track your delivery in real - time through our app.";
//     //     }

//     //     if (lowerMessage.includes('organic') || lowerMessage.includes('pesticide') || lowerMessage.includes('chemical')) {
//     //         return "All our products labeled as 'organic' are certified and grown without synthetic pesticides or fertilizers.We have strict quality control measures in place to ensure the purity of our organic offerings.";
//     //     }
//     // } else {
//     //     if (lowerMessage.includes('sell') || lowerMessage.includes('product') || lowerMessage.includes('inventory')) {
//     //         return "To add new products to your inventory, go to your Seller Dashboard and click on 'Add New Product'.Make sure to include high - quality images and detailed descriptions to increase your sales.";
//     //     }

//     //     if (lowerMessage.includes('payment') || lowerMessage.includes('commission') || lowerMessage.includes('fee')) {
//     //         return "We charge a 5 % commission on each sale.Payments are processed every week and transferred directly to your registered bank account.You can view your earnings and pending payments in the Seller Dashboard.";
//     //     }

//     //     if (lowerMessage.includes('marketing') || lowerMessage.includes('promote')) {
//     //         return "You can promote your products through our Featured Listings program.Additionally, offer seasonal discounts and bundle deals to attract more customers.Our data shows that sellers who update their product listings weekly see a 30 % increase in sales.";
//     //     }

//     //     if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('complaint')) {
//     //         return "For handling returns, check your Seller Dashboard for any return requests.You have 24 hours to approve or dispute a return.We recommend maintaining a quality check before shipping to minimize returns and increase customer satisfaction.";
//     //     }
//     // }

//     // if (lowerMessage.includes('farm') || lowerMessage.includes('grow') || lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
//     //     return "For optimal farming results, consider factors like soil quality, climate, and seasonal timing.Our platform connects you with expert farmers who can provide specific guidance for your situation.Would you like me to arrange a consultation ?";
//     // }

//     // return "Thank you for your question.I'm here to help with any information about our farm-fresh products, sustainable farming practices, and more. Could you provide more details so I can give you a more specific answer?";
// }

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    menuButton.addEventListener('click', function () {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});
