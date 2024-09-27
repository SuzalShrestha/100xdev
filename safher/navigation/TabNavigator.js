import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/afterAuth/HomeScreen';
import SecondScreen from '../screens/afterAuth/SecondScreen';
import ThirdScreen from '../screens/afterAuth/ThirdScreen';

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
                name="Profile"
                component={SecondScreen}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Settings"
                component={ThirdScreen}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
