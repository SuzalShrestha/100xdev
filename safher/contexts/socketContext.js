// import React, {
//     createContext,
//     useContext,
//     useEffect,
//     useState,
//     ReactNode,
// } from "react";
// import { io, Socket } from "socket.io-client";
// import { useAuth } from "./GlobalProvider"; // Uncomment this import
// import { apiUrl } from "../constants"; // Import apiUrl if available

// interface SocketContextType {
//     socket: Socket | null;
//     setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
// }

// export const SocketContext = createContext<SocketContextType | undefined>(undefined);

// export const useSocketContext = () => {
//     const context = useContext(SocketContext);
//     if (context === undefined) {
//         throw new Error(
//             "useSocketContext must be used within a SocketContextProvider"
//         );
//     }
//     return context;
// };

// interface SocketContextProviderProps {
//     children: ReactNode;
// }

// export const SocketContextProvider = ({
//     children,
// }: SocketContextProviderProps) => {
//     const [socket, setSocket] = useState<Socket | null>(null);
//     const { user } = useAuth();

//     useEffect(() => {
//         let newSocket: Socket | undefined;
//         if (user) {
//             newSocket = io(`${apiUrl}`, {
//                 query: {
//                     userId: user.id,
//                 },
//             });
//             setSocket(newSocket);
//         } else if (!user && socket) {
//             socket.close();
//             setSocket(null);
//         }

//         return () => {
//             if (newSocket) newSocket.close();
//         };
//     }, [user]);

//     return (
//         <SocketContext><SocketContext/>
//     );
// };

import React, { useEffect, createContext, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { apiUrl } from "../constants.js"

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        let newSocket;
        if (user) {
            const newSocket = io(`${apiUrl}`, {
                query: {
                    userId: user.id
                },
            });
            setSocket(newSocket);

            // return () => newSocket.close();

        } else if (!user && socket) {
            socket.close();
            setSocket(null);
        }

        return () => {
            if (newSocket) newSocket.close();
        };
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket, setSocket }} >
            {children}
        </SocketContext.Provider>
    );
};
