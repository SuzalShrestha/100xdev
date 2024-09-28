import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { API_URL } from "@env";

const FriendsScreen = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/friends`);
        const data = await response.json();
        if (response.ok) {
          setFriends(data.data);
        } else {
          console.error('Error fetching friends:', data.message);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/friends-suggestions`);
        const data = await response.json();
        if (response.ok) {
          setSuggestions(data.data);
        } else {
          console.error('Error fetching suggestions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchFriends();
    fetchSuggestions();
  }, []);

  const renderFriends = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.fullName}</Text>
    </View>
  );

  const renderSuggestions = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.fullName}</Text>
      <TouchableOpacity style={styles.buttonAdd}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>My Friends</Text>
        <FlatList
          data={friends}
          renderItem={renderFriends}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Friends Suggestion</Text>
        <FlatList
          data={suggestions}
          renderItem={renderSuggestions}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  buttonAdd: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
