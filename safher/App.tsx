import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { GlobalProvider } from './contexts/globalProvider';
import { SocketProvider } from './contexts/socketContext';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (

    <GlobalProvider>
      <SocketProvider >
        <AppNavigator />
      </SocketProvider>
    </GlobalProvider>

  );
};

export default App;
