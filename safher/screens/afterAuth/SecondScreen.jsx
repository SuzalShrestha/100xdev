import React, { useState, useEffect, useMemo } from 'react';
import MapLibreGL, { Callout } from "@maplibre/maplibre-react-native";
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { io } from 'socket.io-client';
import * as turf from '@turf/turf';

MapLibreGL.setConnected(true);
MapLibreGL.setAccessToken(null);

function SecondScreen({ navigation }) {
    const [coords, setCoords] = useState();
    const [receivedCoords, setReceivedCoords] = useState();
    const [myCoords, setMyCoords] = useState({});

    const socket = useMemo(() => {
        return io('https://0q4jhdwq-8000.inc1.devtunnels.ms/');
    }, []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('WebSocket connected second screen');
            socket.emit('join-room', "mukunda");
        });


        socket.on('recieve-coordinates', (message) => {
            console.log(message);
            if (message.longitude && message.latitude) {
                setReceivedCoords({
                    longitude: message.longitude,
                    latitude: message.latitude,
                });
            }
        });

        return () => {
            socket.disconnect();
            console.log('WebSocket disconnected');
        };
    }, []);

    const getCurrentLocation = () => {
        console.log("Inside get location function");
        Geolocation.getCurrentPosition(
            (info) => {
                const newCoords = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                };
                console.log("Got the coordinates");
                setCoords(newCoords);
                setMyCoords(newCoords);
            },
            (error) => {
                console.log("Error getting location:", error);
                Alert.alert(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    if (!coords) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading your location...</Text>
            </View>
        );
    }

    const distance = receivedCoords && turf.distance(
        [receivedCoords.longitude, receivedCoords.latitude],
        [myCoords.longitude, myCoords.latitude],
        { units: 'meters' }
    );

    return (
        <View style={styles.page}>
            <View style={styles.map}>
                <MapLibreGL.MapView
                    zoomEnabled={true}
                    scrollEnabled={true}
                    style={styles.mapOnly}
                    logoEnabled={false}
                    styleURL="https://api.maptiler.com/maps/streets/style.json?key=v2lBbPl6FttawWMYeJyl"
                >
                    <MapLibreGL.Camera
                        centerCoordinate={[coords.longitude, coords.latitude]}
                        zoomLevel={16}
                    />

                    <MapLibreGL.UserLocation
                        androidRenderMode='compass'
                        renderMode='normal'
                        visible={true}
                        showsUserHeadingIndicator={true}
                    />

                    {receivedCoords && (
                        <MapLibreGL.PointAnnotation
                            key={`${receivedCoords.longitude}-${receivedCoords.latitude}`}
                            id='received-location'
                            coordinate={[receivedCoords.longitude, receivedCoords.latitude]}
                            anchor={{ x: 0.5, y: 1 }}
                        >
                            <View>
                                <Callout title='Received Location' />
                            </View>
                        </MapLibreGL.PointAnnotation>
                    )}
                </MapLibreGL.MapView>
            </View>

            <Button title='HomeScreen' onPress={() => navigation.navigate("HomeScreen")} />

            {distance > 1 && <Text>{distance} meter</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 5,
    },
    map: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 4,
        height: '45%',
        width: '100%',
    },
    mapOnly: {
        height: '80%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SecondScreen;
