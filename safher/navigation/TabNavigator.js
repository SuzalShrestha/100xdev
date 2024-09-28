import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/afterAuth/HomeScreen';
import SecondScreen from '../screens/afterAuth/SecondScreen';
import ThirdScreen from '../screens/afterAuth/ThirdScreen';
import { Alert, Text } from 'react-native';
import Profile from '../screens/afterAuth/profile';
import FriendsScreen from '../screens/afterAuth/FriendsScreen';
import Home from '../screens/auth/home/home';
import Notifications from '../screens/afterAuth/Notifications';
import messaging from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {



  useEffect(() => {

    messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification Arrived!', JSON.stringify(remoteMessage));
    });



    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });


    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {

      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );


      navigation?.navigate("SecondScreen", remoteMessage);
    });


    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );


          navigation?.navigate("SecondScreen", remoteMessage);
        }
      });


    return () => {
      unsubscribeOnNotificationOpenedApp();
    };
  }, [navigation]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={ThirdScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="UserProfile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
    </Tab.Navigator >
  );
};

export default TabNavigator;
