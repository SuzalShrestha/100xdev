import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed
import LawIcon from './law.svg';
import Ngo from './ngo.svg';
import Taruma from './taruma.svg';
import Success from './success.svg';
const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LawsInfo')}>
          <LawIcon color={'#2A2D34'} width={30} height={30} />
          <Text style={styles.cardText}>LAWS & RIGHTS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('NGOS')}>
          <Ngo color={'#2A2D34'} width={30} height={30} />
          <Text style={styles.cardText}>NGO SUPPORT</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TraumaCare')}>
          <Taruma color={'#2A2D34'} width={30} height={30} />
          <Text style={styles.cardText}>TRAUMA CARE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('SuccessStories')}>
          <Success color={'#2A2D34'} width={30} height={30} />
          <Text style={styles.cardText}>SUCCESS STORIES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 8,
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2}, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default Home;
