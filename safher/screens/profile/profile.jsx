import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
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
  return (
    <View>
      <View
        style={{
          padding: 20,
          margin: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '50%'}}>
          <UserAvatar size={170} name="Magnus Holm" />
        </View>
        <Text style={styles.headerText}>Magnus</Text>
      </View>
      <View style={{padding: 30}}>
        <Text style={styles.subHeaderText}>Email: </Text>
        <Text style={styles.subHeaderText}>Phone: </Text>
        <Text style={styles.subHeaderText}>Address: </Text>
        <Text style={styles.subHeaderText}>City: </Text>
        <Text style={styles.subHeaderText}>DOB:</Text>
        <Text style={styles.subHeaderText}>Gender: </Text>
      </View>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{width: '60%'}}>
          <Button title="Logout" onPress={() => {}} />
        </TouchableOpacity>
        <View />
      </View>
    </View>
  );
}

export default Profile;
