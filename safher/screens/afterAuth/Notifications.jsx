import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation(); // Use the navigation hook

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const res = await fetch(`${API_URL}/api/users/notifications`);
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getNotifications();
    }, []);

    const renderNotifications = ({ item }) => (
        <TouchableOpacity
            style={styles.notificationCard}
            onPress={() => navigation.navigate(JSON.parse(item.data).link, JSON.parse(item.data).roomId)}
        >
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {notifications.length === 0 ? ( // Check if there are no notifications
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyMessage}>No notifications found</Text>
                </View>
            ) : (

                <FlatList
                    data={notifications}
                    renderItem={renderNotifications}
                    keyExtractor={(item) => item.id.toString()} // Ensure id is a string
                    contentContainerStyle={styles.listContainer} // Add padding to the list
                />

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Light background
        padding: 16,
    },
    notificationCard: {
        backgroundColor: '#ffffff', // White background for the card
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000', // Shadow effect
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 3, // Android shadow
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Dark text color
    },
    listContainer: {
        paddingBottom: 16, // Add some space at the bottom of the list
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
});

export default Notifications;
