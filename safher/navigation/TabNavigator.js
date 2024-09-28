import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/afterAuth/HomeScreen';
import SecondScreen from '../screens/afterAuth/SecondScreen';
import ThirdScreen from '../screens/afterAuth/ThirdScreen';
import { Text } from 'react-native';
import Profile from '../screens/afterAuth/profile';
import FriendsScreen from '../screens/afterAuth/FriendsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (

        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
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
        </Tab.Navigator>

    );
};

export default TabNavigator;
