import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed
import LawIcon from './law.svg';
import Ngo from './ngo.svg';
import Taruma from './taruma.svg';
import Success from './success.svg';
import SOSButton from '../../../SMS';
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('LawsInfo')}>
          <LawIcon color={'black'} width={30} height={30} />
          <Text style={styles.cardText}>Laws and Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('NGOS')}>
          <Ngo color={'black'} width={30} height={30} />
          <Text style={styles.cardText}>NGOs Support</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TraumaCare')}>
          <Taruma color={'black'} width={30} height={30} />
          <Text style={styles.cardText}>Taruma Care</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('SuccessStories')}>
          <Success color={'black'} width={30} height={30} />
          <Text style={styles.cardText}>Success Stories</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    padding: 16,
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 3, // For iOS shadow
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default Home;
