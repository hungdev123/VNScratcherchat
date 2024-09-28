const startChatButton = document.getElementById('startChatButton');
const usernameInput = document.getElementById('username');
const nameContainer = document.getElementById('name-container');
const chatContainer = document.getElementById('chat-container');

const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

startChatButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (username) {
        nameContainer.style.display = 'none';
        chatContainer.style.display = 'block';

        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message';
        welcomeMessage.textContent = `Chào mừng ${username} đến với chat!`;
        messagesDiv.appendChild(welcomeMessage);
    }
});

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();

    if (messageText) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = `${usernameInput.value}: ${messageText}`;

        messagesDiv.appendChild(messageElement);
        messageInput.value = ''; // Xóa trường nhập sau khi gửi
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Cuộn xuống tin nhắn mới
    }
});
