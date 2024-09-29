import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import { useSocket } from './contexts/socketContext';

// Sample police stations data
const policeStations = [
    {
        name: "Station 1",
        phone: "1234567890",
        coordinates: { latitude: 12.9715987, longitude: 77.5945627 }
    },
    {
        name: "Station 2",
        phone: "0987654321",
        coordinates: { latitude: 12.935223, longitude: 77.624482 }
    }
    // Add more stations as necessary
];

const SOSButton = () => {
    const [userLocation, setUserLocation] = useState();
    const socket = useSocket();

    useEffect(() => {

        if (!socket) {
            console.error("Socket is not initialized.");
            return;
        }
        console.log(socket);
        Geolocation.getCurrentPosition(
            (position) => {
                const newCoords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                setUserLocation(newCoords);
                console.log("user location:", userLocation);
            },
            (error) => {
                Alert.alert('Error', 'Unable to get location');
                console.log(error);
            },
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 }
        );
    }, [socket]);

    const makeSOSCall = () => {

        console.log("userlocation inside: ", userLocation);
        if (userLocation) {
            if (!socket) {
                console.log("socket not initialized");
                return;
            }
            // socket.emit("sos-emergency", userLocation)
            socket.on("sos-triggered", (message) => {
                Alert.alert(message);
            }
            )
            const { station } = findNearestPoliceStation(userLocation, policeStations);
            if (station) {
                const message = `Emergency! Current Location: ${userLocation.latitude}, ${userLocation.longitude}`;
                sendMessage(station.phone, message); // Call the function to send the SMS
            } else {
                Alert.alert('Error', 'No police stations found.');
            }
        } else {
            Alert.alert('Error', 'Location is not available.');
        }
    };

    const findNearestPoliceStation = (userLocation, policeStations) => {
        return policeStations.reduce((nearest, station) => {
            const distance = getDistance(
                { latitude: userLocation.latitude, longitude: userLocation.longitude },
                { latitude: station.coordinates.latitude, longitude: station.coordinates.longitude }
            );

            return distance < nearest.distance ? { station, distance } : nearest;
        }, { station: null, distance: Infinity });
    };

    const sendMessage = (phoneNumber, message) => {
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        Linking.openURL(url); // Open SMS app with pre-filled message
    };

    return (
        <View style={{
            width: '100%',
            padding: 10,

        }}>
            <Button title="SOS Emergency Button" onPress={makeSOSCall} />
        </View>
    );
};

export default SOSButton;
