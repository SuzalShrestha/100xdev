import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import { useAuth } from '../../contexts/globalProvider';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d', // Red color for the button
    borderRadius: 5,            // Rounded corners
    paddingVertical: 12,        // Vertical padding
    paddingHorizontal: 20,      // Horizontal padding
    alignItems: 'center',       // Center the text
    marginTop: 20,              // Margin above the button
  },
  logoutButtonText: {
    color: '#ffffff',           // White text color
    fontSize: 16,               // Font size
    fontWeight: 'bold',         // Bold text
  },
});

function Profile({ navigation }) {
  const { user } = useAuth();

  // Logout user functionality
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      Alert.alert('Logged out', 'You have successfully logged out.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out: ', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ width: '50%' }}>
          <UserAvatar size={170} name={user.fullName} />
        </View>
        <Text style={styles.headerText}>{user.fullName}</Text>
        <Text style={styles.subHeaderText}>@{user.username}</Text>
      </View>
      <View style={{ padding: 30 }}>
        <Text style={styles.subHeaderText}>Email: {user.email}</Text>
        <Text style={styles.subHeaderText}>Phone: {user.phone}</Text>
        <Text style={styles.subHeaderText}>Address: {user.address}</Text>
        <Text style={styles.subHeaderText}>DOB: {user.dob}</Text>
        <Text style={styles.subHeaderText}>Gender: {user.gender}</Text>
      </View>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Profile;
