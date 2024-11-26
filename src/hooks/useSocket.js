import { useEffect } from 'react';
import { connectSocket, disconnectSocket } from '../services/socket/socket';
import { listenToSocketEvents } from '../services/socket/socketEvents';

const useSocket = () => {
    useEffect(() => {
        // Connect the socket when the component mounts
        connectSocket();

        // Listen to socket events
        listenToSocketEvents();

        // Disconnect the socket when the component unmounts
        return () => {
            disconnectSocket();
        };
    }, []);
};

export default useSocket;
