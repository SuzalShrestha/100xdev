import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/globalProvider';
import getFCMToken from '../../utils/getFCMToken';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
    color: 'black',
  },
  touchable: {
    backgroundColor: '#92DCE5',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '75%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLogged, setIsLogged] = React.useState(false);
  const [fcmToken, setFcmToken] = useState(null);
  const navigation = useNavigation();
  const { setUser, setIsAuthenticated, accessToken } = useAuth()

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem('accessToken', data.data.accessToken);
        await AsyncStorage.setItem('user', JSON.stringify(data.data.user));
        setError('');
        setIsAuthenticated(true)
        setUser(data.data.user)

        const token = await getFCMToken();
        console.log(token)

        try {
          console.log("bhitra", token)
          const res = await fetch(`${API_URL}/api/users/create-fcm-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
          });

          console.log("token bhitra ko console", await res.json())
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'FCM Token not generated',
          });
          console.log("sdlkaf", res.ok)
        }

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });

        navigation.navigate("AfterAuth");
      } else {
        console.log(await res.json());
        setError('Credentials invalid');
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid credentials',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Internal Server Error',
      });
      console.log("error: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>SAFHER</Text>
        <View style={{ margin: 10 }}></View>
      </View>
      <TextInput
        style={{
          padding: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          width: '75%',
          margin: 10,
        }}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={{
          padding: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          width: '75%',
          margin: 10,
        }}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.touchable} onPress={handleLogin}>
        <Text style={{ color: 'white', margin: 5 }}>LOGIN</Text>
      </TouchableOpacity>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

export default Login;
