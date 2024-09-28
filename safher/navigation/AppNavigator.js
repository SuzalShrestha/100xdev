import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Login from '../screens/auth/login';
import messaging from '@react-native-firebase/messaging';
import SecondScreen from '../screens/afterAuth/SecondScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AfterAuth"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};

export default AppNavigator;
