const socket = io(); // Kết nối tới máy chủ

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const nameInput = document.getElementById('name-input');
const setNameButton = document.getElementById('set-name-button');
const nameContainer = document.getElementById('name-container');
const chatContainer = document.getElementById('chat-container');

// Biến để lưu tên người dùng
let userName;

// Danh sách từ cấm (đặt ẩn trong mã)
const bannedWords = ['fuck', 'dick', 'shit']; // Thay thế bằng các từ cấm thực tế của bạn

// Xử lý khi người dùng nhấn nút xác nhận tên
setNameButton.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (userName) {
        nameContainer.style.display = 'none'; // Ẩn bảng nhập tên
        chatContainer.style.display = 'block'; // Hiện bảng chat
    } else {
        alert("Vui lòng nhập tên của bạn.");
    }
});

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Kiểm tra từ cấm
function containsBannedWords(message) {
    return bannedWords.some(word => message.includes(word));
}

// Hàm gửi tin nhắn
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        if (containsBannedWords(message)) {
            alert("Tin nhắn chứa từ cấm!");
            messageInput.value = ''; // Xóa ô nhập
            return;
        }

        // Hiển thị tin nhắn cho người gửi
        addMessage(message, userName);
        
        // Gửi tin nhắn đến máy chủ
        socket.emit('chat message', { message, userName });
        
        messageInput.value = ''; // Xóa ô nhập sau khi gửi

        // Xóa tin nhắn của người gửi sau 100ms
        setTimeout(() => {
            const messageElements = chatBox.getElementsByTagName('div');
            if (messageElements.length > 0) {
                chatBox.removeChild(messageElements[messageElements.length - 1]);
            }
        }, 100); // Xóa sau 100ms
    }
}

// Thêm sự kiện click cho nút gửi
sendButton.addEventListener('click', sendMessage);

// Nhận tin nhắn từ máy chủ
socket.on('chat message', ({ message, userName }) => {
    addMessage(message, userName); // Hiển thị tin nhắn của người khác với tên của họ
});

// Thêm xử lý cho phím Enter để gửi tin nhắn
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage(); // Gọi hàm gửi tin nhắn
    }
});
