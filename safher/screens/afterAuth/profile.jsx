import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import { useAuth } from '../../contexts/globalProvider';
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
});
function Profile() {
  const { user } = useAuth();

  return (
    <View>
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
        <Text style={styles.subHeaderText}>@{user.username} </Text>
      </View>
      <View style={{ padding: 30 }}>
        <Text style={styles.subHeaderText}>Email:{user.email} </Text>
        <Text style={styles.subHeaderText}>Phone:{user.phone} </Text>
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
        <TouchableOpacity style={{ width: '60%' }}>
          <Button title="Logout" onPress={() => { }} />
        </TouchableOpacity>
        <View />
      </View>
    </View>
  );
}

export default Profile;
