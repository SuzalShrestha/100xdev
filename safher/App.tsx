// import React, { useState, useEffect, useMemo } from 'react';
// import MapLibreGL, { Callout } from "@maplibre/maplibre-react-native";
// import { StyleSheet, View, Text, Button, Alert } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';
// import { io } from 'socket.io-client';

// MapLibreGL.setConnected(true);
// MapLibreGL.setAccessToken(null);

// function App(): React.JSX.Element {
//   const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [path, setPath] = useState<Array<[number, number]>>([]);
//   const [followMe, setFollowMe] = useState<boolean>(false);
//   const [locationPermission, setLocationPermission] = useState<boolean>(false);

//   const socket = useMemo(() => {
//     return io('https://0q4jhdwq-8000.inc1.devtunnels.ms/');
//   }, []);

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('WebSocket connected');
//     });



//     socket.on('coordinates', () => {
//       console.log("coordinates received");
//     });

//     return () => {
//       socket.disconnect();
//       console.log('WebSocket disconnected');
//     };
//   }, []);

//   useEffect(() => {
//     const checkPermission = async () => {
//       const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       console.log(result);
//       if (result === RESULTS.GRANTED) {
//         setLocationPermission(true);
//         console.log("Getting the current location");
//         getCurrentLocation();
//       } else {
//         await requestLocationPermission();
//       }
//     };
//     checkPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       if (result === RESULTS.GRANTED) {
//         setLocationPermission(true);
//         getCurrentLocation();
//       } else {
//         Alert.alert('Permission Denied', 'Location access is required to use this feature.');
//       }
//     } catch (error) {
//       console.error('Failed to request location permission:', error);
//     }
//   };

//   const handleFollowMe = () => {
//     console.log("followMe button has been clicked!");
//     setFollowMe(true);
//   };

//   const handleStopFollowing = () => {
//     setFollowMe(false);
//   };

//   useEffect(() => {
//     let watchId: number | undefined;

//     if (followMe && locationPermission) {


//       socket.emit('join-room', "mukunda");

//       socket.on("room-joined", (message) => {
//         console.log(message)
//       })
//       console.log("Follow me=", followMe);
//       console.log("Location permission=", locationPermission);

//       watchId = Geolocation.watchPosition(
//         (info) => {
//           const newCoords = {
//             latitude: info.coords.latitude,
//             longitude: info.coords.longitude,
//           };

//           setCoords(newCoords);
//           console.log(newCoords);
//           console.log("Coordinates changed:", newCoords);
//           socket.emit('send-coordinates', newCoords);
//           setPath((prevPath) => [...prevPath, [newCoords.longitude, newCoords.latitude]]);
//         },
//         (error) => console.log("Error getting location:", error),
//         {
//           enableHighAccuracy: false,
//           distanceFilter: 0.5,
//           maximumAge: 0,
//         }
//       );
//     }

//     return () => {
//       if (watchId !== undefined) {
//         Geolocation.clearWatch(watchId);
//       }
//     };
//   }, [followMe, locationPermission]);

//   const getCurrentLocation = () => {
//     console.log("Inside get location function");
//     Geolocation.getCurrentPosition(
//       (info) => {
//         const newCoords = {
//           latitude: info.coords.latitude,
//           longitude: info.coords.longitude,
//         };
//         console.log("Got the coordinates");
//         setCoords(newCoords);
//       },
//       (error) => {
//         console.log("Error getting location:", error);
//         Alert.alert(error.message);
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   if (!coords) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading your location...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.page}>
//       <View style={styles.map}>
//         <MapLibreGL.MapView
//           zoomEnabled={true}
//           scrollEnabled={true}
//           style={styles.mapOnly}
//           logoEnabled={false}
//           styleURL="https://api.maptiler.com/maps/streets/style.json?key=v2lBbPl6FttawWMYeJyl"
//         >
//           <MapLibreGL.Camera
//             centerCoordinate={[coords.longitude, coords.latitude]}
//             zoomLevel={16}
//           />

//           <MapLibreGL.UserLocation
//             androidRenderMode='compass'
//             renderMode='normal'
//             visible={true}
//             showsUserHeadingIndicator={true}
//           />

//           <MapLibreGL.PointAnnotation
//             id='my-location'
//             coordinate={[coords.longitude, coords.latitude]}
//             anchor={{ x: 0.5, y: 1 }}
//           >
//             <View>
//               <Callout title='Current Location' />
//             </View>
//           </MapLibreGL.PointAnnotation>

//           {followMe && path.length >= 2 && (
//             <MapLibreGL.ShapeSource
//               id="pathSource"
//               shape={{
//                 type: 'FeatureCollection',
//                 features: [{
//                   type: 'Feature',
//                   geometry: { type: 'LineString', coordinates: path },
//                 }],
//               }}
//             >
//               <MapLibreGL.LineLayer
//                 id="pathLayer"
//                 style={{
//                   lineColor: 'blue',
//                   lineWidth: 5,
//                 }}
//               />
//             </MapLibreGL.ShapeSource>
//           )}
//         </MapLibreGL.MapView>

//         <View>
//           <Button title='Follow Me!' onPress={handleFollowMe} />
//           <Button title='Stop Follow Me!' onPress={handleStopFollowing} />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     padding: 5,
//   },
//   map: {
//     borderColor: 'black',
//     borderWidth: 2,
//     borderRadius: 4,
//     height: '45%',
//     width: '100%',
//   },
//   mapOnly: {
//     height: '80%',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;



import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import SecondScreen from './screens/secondScreen';
import ThirdScreen from './screens/thirdScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
        <Stack.Screen name="ThirdScreen" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
