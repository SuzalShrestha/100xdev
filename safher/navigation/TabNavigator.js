import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/afterAuth/HomeScreen';
import SecondScreen from '../screens/secondScreen';
import ThirdScreen from '../screens/thirdScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={SecondScreen} />
            <Tab.Screen name="Settings" component={ThirdScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
