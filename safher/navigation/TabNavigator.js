import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/afterAuth/HomeScreen';
// import SecondScreen from '../screens/afterAuth/SecondScreen';
import ThirdScreen from '../screens/afterAuth/ThirdScreen';
import Profile from '../screens/afterAuth/profile';
import FriendsScreen from '../screens/afterAuth/FriendsScreen';
import Home from '../screens/auth/home/home';
import HomeIcon from './home.svg';
import MapIcon from './map.svg';
import SOSICON from './sos.svg';
import ProfileIcon from './profile.svg';
import FriendsIcon from './friends.svg';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
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
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen name="Maps" component={HomeScreen} />
      <Tab.Screen
        name="SOS"
        component={ThirdScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
