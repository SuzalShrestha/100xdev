import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/afterAuth/HomeScreen';
import Profile from '../screens/afterAuth/profile';
import FriendsScreen from '../screens/afterAuth/FriendsScreen';
import Home from '../screens/auth/home/home';
import HomeIcon from './home.svg';
import MapIcon from './map.svg';
import SOSICON from './sos.svg';
import ProfileIcon from './profile.svg';
import FriendsIcon from './friends.svg';
import messaging from '@react-native-firebase/messaging';
import Notifications from '../screens/afterAuth/Notifications';
import { Alert } from 'react-native';
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

  useEffect(() => {

    messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification Arrived!', remoteMessage.notification.title, remoteMessage.notification.body)
    });



    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });


    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {

      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );


      navigation?.navigate("FollowScreen", remoteMessage);
    });


    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );


          navigation?.navigate("FollowScreen", remoteMessage);
        }
      });


    return () => {
      unsubscribeOnNotificationOpenedApp();
    };
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={size} color={color} />;
          }
          if (route.name === 'Maps') {
            return <MapIcon size={size} color={color} />;
          }
          if (route.name === 'SOS') {
            return <SOSICON size={size} color={color} />;
          }
          if (route.name === 'Profile') {
            return <ProfileIcon size={size} color={color} />;
          }
          if (route.name === 'Friends') {
            return <FriendsIcon size={size} color={color} />;
          }
          return <HomeIcon size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Info" component={Home} />
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
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;
