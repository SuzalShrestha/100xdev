import React, { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './navigation/AppNavigator';
import { GlobalProvider } from './contexts/globalProvider';
import { SocketProvider } from './contexts/socketContext';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const [token, setToken] = useState('');

  // Request notification permission
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    } else {
      console.log('Not authorized');
      return false;
    }
  }

  // Get FCM token for this device
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      setToken(token);
      console.log(token);
    } catch (error) {
      console.log('Error getting FCM token', error);
    }
  };

  useEffect(() => {
    const checkPermissionsAndGetToken = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        await getToken();
      }
    };
    checkPermissionsAndGetToken();

    // Listen for foreground messages
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    return () => {
      unsubscribeOnNotificationOpenedApp();
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
