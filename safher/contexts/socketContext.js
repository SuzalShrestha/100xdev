import React, { useEffect, createContext, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from "@env";
import { useAuth } from './globalProvider.js';

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user, isAuthenticated, accessToken } = useAuth();

    useEffect(() => {
        if (user && isAuthenticated) {

            const newSocket = io(API_URL, {
                query: { userId: user.id },
                auth: { token: accessToken }
            });
            setSocket(newSocket);

            newSocket.on('connect', () => console.log('WebSocket connected'));

            return () => newSocket.close();
        } else if (socket) {
            socket.close();
            setSocket(null);
        }
    }, [user, isAuthenticated]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
