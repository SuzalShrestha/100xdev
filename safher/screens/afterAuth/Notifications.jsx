import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const res = await fetch(`${API_URL}/api/users/notifications`);
                if (res.ok) {
                    const data = await res.json();
                    setNotifications(data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getNotifications();
    }, [notifications])

    const renderNotifications = ({ item }) => (
        <View >
            <TouchableOpacity
                onPress={() => navigation.navigate('SecondScreen', { notificationId: item.id })} // Navigate to SecondScreen with notification ID
            >
                <Text>{item.title}</Text> {/* Display notification title */}
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <FlatList
                data={notifications}
                renderItem={renderNotifications}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Notifications;