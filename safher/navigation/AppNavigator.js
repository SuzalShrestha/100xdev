import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import Login from '../screens/auth/login';

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
