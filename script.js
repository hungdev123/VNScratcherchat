const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();

    if (messageText) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = messageText;

        messagesDiv.appendChild(messageElement);
        messageInput.value = ''; // Xóa trường nhập sau khi gửi
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Cuộn xuống tin nhắn mới
    }
});
