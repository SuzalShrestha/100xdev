import React, { useState, useEffect, useMemo, useRef } from 'react';
import MapLibreGL, { Callout } from "@maplibre/maplibre-react-native";
import { StyleSheet, View, Text, Button, Alert, AppState } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
import { io } from 'socket.io-client';
import BackgroundActions from 'react-native-background-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSocket } from '../../contexts/socketContext';

// Set MapLibre configurations
MapLibreGL.setConnected(true);
MapLibreGL.setAccessToken(null);

const HomeScreen = ({ navigation }) => {
    const [coords, setCoords] = useState(null);
    const [path, setPath] = useState([]);
    const [followMe, setFollowMe] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);
    const appState = useRef(AppState.currentState);
    const { socket } = useSocket();

    // WebSocket connection setup
    // const socket = useMemo(() => io('https://0q4jhdwq-8000.inc1.devtunnels.ms/'), []);

    // Background task for tracking location
    const veryIntensiveTask = async () => {
        console.log(' entered')
        const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
        await new Promise(async (resolve) => {
            while (BackgroundActions.isRunning()) {
                console.log('Background task running');
                Geolocation.getCurrentPosition(
                    (info) => {
                        const newCoords = {
                            latitude: info.coords.latitude,
                            longitude: info.coords.longitude,
                        };
                        setCoords(newCoords);
                        console.log(coords);
                        socket.emit('send-coordinates', newCoords);
                        setPath((prevPath) => [...prevPath, [newCoords.longitude, newCoords.latitude]]);
                        console.log('Coordinates in background:', newCoords);
                    },
                    (error) => console.log('Error getting location in background:', error),
                    {
                        enableHighAccuracy: false,
                        distanceFilter: 0.5,
                        maximumAge: 0,
                        timeout: 3000,
                    }
                );
                await sleep(10000); // Wait 10 seconds before the next location update
            }
        });
    };

    // Background actions options
    const options = {
        taskName: 'Location Tracking',
        taskTitle: 'Location Tracking Active',
        taskDesc: 'Tracking your location in the background',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff0000',
    };

    // Request location permissions
    const requestLocationPermissions = async () => {
        if (Platform.OS === 'android') {
            const fineLocationStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            const backgroundLocationStatus = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

            if (fineLocationStatus === RESULTS.GRANTED && backgroundLocationStatus === RESULTS.GRANTED) {
                setLocationPermission(true);
                getCurrentLocation();
            } else {
                Alert.alert('Permission Denied', 'Location access is required to use this feature.');
            }
        } else {
            const locationStatus = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
            if (locationStatus === RESULTS.GRANTED) {
                setLocationPermission(true);
                getCurrentLocation();
            } else {
                Alert.alert('Permission Denied', 'Location access is required to use this feature.');
            }
        }
    };

    // Get current location
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (info) => {
                const newCoords = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                };
                setCoords(newCoords);
                console.log('Current location:', newCoords);
            },
            (error) => {
                console.log('Error getting location:', error);
                Alert.alert('Error', error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 3000,
                maximumAge: 0,
            }
        );
    };

    // Enable follow-me mode
    const handleFollowMe = async () => {
        setFollowMe(true);
        console.log('Follow Me enabled');
    };

    // Disable follow-me mode
    const handleStopFollowing = async () => {
        setFollowMe(false);
        await BackgroundActions.stop();
        console.log('Follow Me disabled');
    };

    // Listen for app state changes
    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            appState.current = nextAppState;
            console.log('Next app state:', nextAppState);
            if (nextAppState === 'background' && followMe && locationPermission) {
                console.log('Running in background');
                BackgroundActions.start(veryIntensiveTask, options);
            } else if (nextAppState === 'active') {
                BackgroundActions.stop();
            }
        });

        return () => {
            subscription.remove();
        };
    }, [followMe, locationPermission]);

    // WebSocket connection management
    useEffect(() => {


        socket.emit('join-room')
    }, [socket]);

    // Check and request location permissions on component mount
    useEffect(() => {
        const checkPermissions = async () => {
            if (Platform.OS === 'android') {
                const fineLocationStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                const backgroundLocationStatus = await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);

                if (fineLocationStatus === RESULTS.GRANTED && backgroundLocationStatus === RESULTS.GRANTED) {
                    setLocationPermission(true);
                    getCurrentLocation();
                } else {
                    await requestLocationPermissions();
                }
            } else {
                const locationStatus = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
                if (locationStatus === RESULTS.GRANTED) {
                    setLocationPermission(true);
                    getCurrentLocation();
                } else {
                    await requestLocationPermissions();
                }
            }
        };
        checkPermissions();
    }, []);

    // Track location when follow-me mode is enabled
    useEffect(() => {
        if (followMe && locationPermission) {
            console.log('Tracking in follow-me mode');
            const watchId = Geolocation.watchPosition(
                (info) => {
                    const newCoords = {
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    };
                    setCoords(newCoords);
                    console.log("In follow me mode: ", coords)
                    socket.emit('send-coordinates', newCoords);
                    setPath((prevPath) => [...prevPath, [newCoords.longitude, newCoords.latitude]]);
                },
                (error) => console.log('Error getting location:', error),
                {
                    enableHighAccuracy: false,
                    distanceFilter: 0.5,
                    maximumAge: 0,
                    timeout: 5000,
                }
            );

            return () => {
                Geolocation.clearWatch(watchId);
            };
        }
    }, [locationPermission, followMe]);

    if (!coords) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading your location...</Text>
            </View>
        );
    }

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

                    <MapLibreGL.PointAnnotation
                        id='my-location'
                        coordinate={[coords.longitude, coords.latitude]}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        <View>
                            <Callout title='Current Location' />
                        </View>
                    </MapLibreGL.PointAnnotation>

                    {followMe && path.length >= 2 && (
                        <MapLibreGL.ShapeSource
                            id="pathSource"
                            shape={{
                                type: 'FeatureCollection',
                                features: [{
                                    type: 'Feature',
                                    geometry: { type: 'LineString', coordinates: path },
                                }],
                            }}
                        >
                            <MapLibreGL.LineLayer
                                id="pathLayer"
                                style={{
                                    lineColor: 'blue',
                                    lineWidth: 5,
                                }}
                            />
                        </MapLibreGL.ShapeSource>
                    )}
                </MapLibreGL.MapView>

                <View>
                    <Button title='Follow Me!' onPress={handleFollowMe} />
                    <Button title='Stop Follow Me' onPress={handleStopFollowing} />
                    <Button title='Logout' onPress={() => {
                        AsyncStorage.clear();
                        navigation.navigate("Login")
                    }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    map: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapOnly: {
        flex: 1,
        width: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
