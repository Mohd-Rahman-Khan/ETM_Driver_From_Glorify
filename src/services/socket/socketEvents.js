import { getSocket } from './socket';

// Function to listen to socket events
export const listenToSocketEvents = () => {
    const socket = getSocket();

    // Example: Listening to a "message" event
    socket.on('message', (data) => {
        console.log('Received message:', data);
    });

    // Example: Listening to a "user-connected" event
    socket.on('user-connected', (userId) => {
        console.log('User connected:', userId);
    });
};

// Function to emit socket events
export const emitSocketEvent = (eventName, data) => {
    const socket = getSocket();
    socket.emit(eventName, data);
};
