import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// Example of an infinite loop task
const veryIntensiveTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(`Task iteration: ${i}`);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask Title',
    taskDesc: 'ExampleTask Description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // For deep linking (optional)
    parameters: {
        delay: 1000, // 1-second delay for the task loop
    },
};

const ThirdScreen = () => {
    const [isRunning, setIsRunning] = useState(false);

    // Function to start the background service
    const startBackgroundService = async () => {
        try {
            if (!isRunning) {
                await BackgroundService.start(veryIntensiveTask, options);
                await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask Description' });
                setIsRunning(true);
                Alert.alert('Background Service Started');
            } else {
                Alert.alert('Service is already running');
            }
        } catch (error) {
            console.error('Error starting background service:', error);
        }
    };

    // Function to stop the background service
    const stopBackgroundService = async () => {
        try {
            if (isRunning) {
                await BackgroundService.stop();
                setIsRunning(false);
                Alert.alert('Background Service Stopped');
            } else {
                Alert.alert('Service is not running');
            }
        } catch (error) {
            console.error('Error stopping background service:', error);
        }
    };

    useEffect(() => {
        // Optional: Cleanup or checking service state on component unmount
        return () => {
            if (isRunning) {
                BackgroundService.stop();
            }
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Background Service Example</Text>
            <Button title="Start Background Service" onPress={startBackgroundService} />
            <Button title="Stop Background Service" onPress={stopBackgroundService} />
            <Text>Service Running: {isRunning ? 'Yes' : 'No'}</Text>

            <View>
                <Button />
            </View>
        </View>
    );
};

export default ThirdScreen;
