import React, { useEffect } from 'react';
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

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await AsyncStorage.getItem('isLogged');
            if (loggedIn === 'true') {
                setIsLogged(true);
            }
        };
        checkLoginStatus();
    }, []);

    const handleLogin = async () => {
        const res = await fetch(`process.env.API_URL/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Loginlication/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            setError('');
            setIsLogged(true);
            await AsyncStorage.setItem('isLogged', 'true');
            await AsyncStorage.setItem('user', res.json());
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'Welcome back!',
            });
        } else {
            setError('Credentials invalid');
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'Invalid credentials',
            });
        }
    };

    if (isLogged) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.headerText}>Horray! Logged In</Text>
                <TouchableOpacity onPress={() => setIsLogged(false)}>
                    <Text>Log out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

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
                {/* <MaterialIcons name="arrow-right" size={30} color="black" /> */}
            </TouchableOpacity>
            <Toast ref={ref => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default Login;