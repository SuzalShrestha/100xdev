import React, { useState, useEffect, useMemo } from 'react';
import MapLibreGL, { Callout } from "@maplibre/maplibre-react-native";
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { io } from 'socket.io-client';
import * as turf from '@turf/turf';
import { useSocket } from '../../contexts/socketContext';

MapLibreGL.setConnected(true);
MapLibreGL.setAccessToken(null);

function FollowScreen({ navigation, route }) {
    const [coords, setCoords] = useState();
    const [receivedCoords, setReceivedCoords] = useState();
    const [myCoords, setMyCoords] = useState({});
    const { socket } = useSocket();


    useEffect(() => {

        console.log("inside useeffect")
        const { params } = route;

        const roomId = params?.data?.roomId;
        console.log("roomid:", params?.data?.roomId);


        socket.emit('follow-room', roomId);



        socket.on('receive-coordinates', (message) => {
            console.log("Eta aayo", message);
            if (message.longitude && message.latitude) {
                setReceivedCoords({
                    longitude: message.longitude,
                    latitude: message.latitude,
                });
            }
        });
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

export default FollowScreen;
