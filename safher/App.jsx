import React, { useEffect } from 'react'; // Import necessary React components
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer for navigation
import { GlobalProvider } from './contexts/globalProvider'; // Import global context provider for state management
import { SocketProvider } from './contexts/socketContext'; // Import socket context provider for real-time communication
import AppNavigator from './navigation/AppNavigator'; // Import the main app navigator

function App() {

  useEffect(() => {


    // Cleanup the listener when the component unmounts
    return () => {
    };
  }, []);

  return (
    <GlobalProvider>
      <SocketProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SocketProvider>
    </GlobalProvider>
  );
}

export default App; 
