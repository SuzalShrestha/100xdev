import React, {useState, useEffect, useMemo, useRef} from 'react';
import MapLibreGL from '@maplibre/maplibre-react-native';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  AppState,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import BackgroundActions from 'react-native-background-actions';
import {useSocket} from '../../contexts/socketContext';
import {getDistance} from 'geolib';
import {Linking} from 'react-native';

// Set MapLibre configurations
MapLibreGL.setConnected(true);
MapLibreGL.setAccessToken(null);

const HomeScreen = ({navigation}) => {
  const [coords, setCoords] = useState(null);
  const [path, setPath] = useState([]);
  const [followMe, setFollowMe] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const appState = useRef(AppState.currentState);
  const {socket} = useSocket();

  // Background task for tracking location
  const veryIntensiveTask = async () => {
    console.log(' entered');
    const sleep = time => new Promise(resolve => setTimeout(resolve, time));
    await new Promise(async resolve => {
      while (BackgroundActions.isRunning()) {
        console.log('Background task running');
        Geolocation.getCurrentPosition(
          info => {
            const newCoords = {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            };
            setCoords(newCoords);
            console.log(coords);
            socket.emit('send-coordinates', newCoords);
            setPath(prevPath => [
              ...prevPath,
              [newCoords.longitude, newCoords.latitude],
            ]);
            console.log('Coordinates in background:', newCoords);
          },
          error => console.log('Error getting location in background:', error),
          {
            enableHighAccuracy: false,
            distanceFilter: 0.5,
            maximumAge: 0,
            timeout: 3000,
          },
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
      const fineLocationStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      const backgroundLocationStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      );

      if (
        fineLocationStatus === RESULTS.GRANTED &&
        backgroundLocationStatus === RESULTS.GRANTED
      ) {
        setLocationPermission(true);
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to use this feature.',
        );
      }
    } else {
      const locationStatus = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
      if (locationStatus === RESULTS.GRANTED) {
        setLocationPermission(true);
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location access is required to use this feature.',
        );
      }
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        const newCoords = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        setCoords(newCoords);
        console.log('Current location:', newCoords);
      },
      error => {
        console.log('Error getting location:', error);
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 0,
      },
    );
  };

  // Enable follow-me mode
  const handleFollowMe = async () => {
    socket.emit('join-room');
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

  // Check and request location permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      if (Platform.OS === 'android') {
        const fineLocationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        const backgroundLocationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        );

        if (
          fineLocationStatus === RESULTS.GRANTED &&
          backgroundLocationStatus === RESULTS.GRANTED
        ) {
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
        info => {
          const newCoords = {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          };
          setCoords(newCoords);
          console.log('In follow me mode: ', coords);
          socket.emit('send-coordinates', newCoords);
          setPath(prevPath => [
            ...prevPath,
            [newCoords.longitude, newCoords.latitude],
          ]);
        },
        error => console.log('Error getting location:', error),
        {
          enableHighAccuracy: false,
          distanceFilter: 0.5,
          maximumAge: 0,
          timeout: 5000,
        },
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

  const policeStations = [
    {
      name: 'Station 1',
      phone: '1234567890',
      coordinates: {latitude: 12.9715987, longitude: 77.5945627},
    },
    {
      name: 'Station 2',
      phone: '0987654321',
      coordinates: {latitude: 12.935223, longitude: 77.624482},
    },
    // Add more stations as necessary
  ];

  const makeSOSCall = async () => {
    if (coords) {
      socket.emit('sos-emergency', coords);
      Alert.alert('SOS Triggered!');

      const {station} = findNearestPoliceStation(coords, policeStations);
      if (station) {
        const message = `Emergency! Current Location: ${coords.latitude}, ${coords.longitude}`;
        sendMessage(station.phone, message); // Call the function to send the SMS
      } else {
        Alert.alert('Error', 'No police stations found.');
      }
    } else {
      Alert.alert('Error', 'Location is not available.');
    }
  };

  const findNearestPoliceStation = (coords, policeStations) => {
    return policeStations.reduce(
      (nearest, station) => {
        const distance = getDistance(
          {latitude: coords.latitude, longitude: coords.longitude},
          {
            latitude: station.coordinates.latitude,
            longitude: station.coordinates.longitude,
          },
        );

        return distance < nearest.distance ? {station, distance} : nearest;
      },
      {station: null, distance: Infinity},
    );
  };

  const sendMessage = (phoneNumber, message) => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(url); // Open SMS app with pre-filled message
  };

  return (
    <View style={styles.page}>
      <View style={styles.mapContainer}>
        <MapLibreGL.MapView
          zoomEnabled={true}
          scrollEnabled={true}
          style={styles.mapOnly}
          logoEnabled={false}
          styleURL="https://api.maptiler.com/maps/streets/style.json?key=v2lBbPl6FttawWMYeJyl">
          <MapLibreGL.Camera
            centerCoordinate={[coords.longitude, coords.latitude]}
            zoomLevel={16}
          />

          <MapLibreGL.UserLocation
            androidRenderMode="compass"
            renderMode="normal"
            visible={true}
            showsUserHeadingIndicator={true}
          />
        </MapLibreGL.MapView>
      </View>

      <View style={styles.buttonContainer}>
        {!followMe && (
          <TouchableOpacity
            style={styles.followButton}
            onPress={handleFollowMe}>
            <Text style={styles.buttonText}>Follow Me!</Text>
          </TouchableOpacity>
        )}
        {followMe && (
          <TouchableOpacity
            style={styles.stopFollowingButton}
            onPress={handleStopFollowing}>
            <Text style={{...styles.buttonText, color: 'white'}}>
              Stop Following
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.sosContainer}>
        <View style={styles.sosButton}>
          <TouchableOpacity onPress={makeSOSCall}>
            <Text style={{color: 'white', fontSize: 20}}>SOS Button</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '66%', // 1/3 of the screen height
    borderWidth: 2, // Adding border to the map
    borderColor: '#ccc', // Light gray border color
    padding: 10, // Adding padding around the map
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '13%', // 1/3 of the screen height
  },
  sosContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '13%', // 1/3 of the screen height
  },
  followButton: {
    backgroundColor: '#ffffff', // White color for the Follow Me button
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    borderWidth: 1, // Adding border for better visibility
    borderColor: '#ccc', // Light gray border color
  },
  stopFollowingButton: {
    color: '#ffffff',
    backgroundColor: '#dc3545', // Red color for the Stop Following button
    padding: 10,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: '#CE2D4F', // Red color for the SOS button
    padding: 20, // Larger padding for larger size
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    fontSize: 20,
  },
  buttonText: {
    color: '#000000', // Black text for visibility
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOnly: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
