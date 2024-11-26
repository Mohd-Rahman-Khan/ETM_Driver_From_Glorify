import io from 'socket.io-client';
import { API_BASE_URL } from '../../config/urls';

// Create a socket instance
const socket = io(API_BASE_URL, {
    path: "/api/kafkaProducer",
    transports: ['websocket'],  // Ensures the use of WebSockets
    reconnectionAttempts: 10,   // Number of reconnection attempts
    reconnectionDelay: 5000,    // Delay between reconnections
});

// Function to connect the socket
export const connectSocket = () => {
    socket.connect();
    console.log('Socket connected');
};

// Function to disconnect the socket
export const disconnectSocket = () => {
    socket.disconnect();
    console.log('Socket disconnected');
};

// Access the socket instance globally
export const getSocket = () => socket;

export default socket;
