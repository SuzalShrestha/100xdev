import React, { useEffect } from 'react'; // Import necessary React components
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer for navigation
import { GlobalProvider } from './contexts/globalProvider'; // Import global context provider for state management
import { SocketProvider } from './contexts/socketContext'; // Import socket context provider for real-time communication
import AppNavigator from './navigation/AppNavigator'; // Import the main app navigator
import messaging from '@react-native-firebase/messaging'; // Import Firebase messaging for handling notifications
import SecondScreen from './screens/afterAuth/SecondScreen'; // Import the screen to navigate to
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook to access the navigation object
import { Alert } from 'react-native';

function App() {

  useEffect(() => {

    // Listen for foreground messages
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification Arrived!', JSON.stringify(remoteMessage));
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  return (
    <GlobalProvider>
      <SocketProvider>

        <AppNavigator />

      </SocketProvider>
    </GlobalProvider>
  );
}

export default App; 
