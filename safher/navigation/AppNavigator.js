import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Login from '../screens/auth/login';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import FollowScreen from '../screens/afterAuth/FollowScreen';
import Laws from '../screens/afterAuth/Info/Laws';
import NGOsList from '../screens/afterAuth/Info/NGOS';
import TraumaCare from '../screens/afterAuth/Info/TraumaCare';
import SuccessStoriesCards from '../screens/afterAuth/Info/SuccessStory';

const Stack = createStackNavigator();

const AppNavigator = ({ navigation }) => {


    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="LawsInfo"
                component={Laws}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NGOS"
                component={NGOsList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SuccessStories"
                component={SuccessStoriesCards}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TraumaCare"
                component={TraumaCare}
                options={{ headerShown: false }}
            />



            <Stack.Screen
                name="AfterAuth"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FollowScreen"
                component={FollowScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
