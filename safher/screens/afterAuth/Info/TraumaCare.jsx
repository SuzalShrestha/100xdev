import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView } from 'react-native';

const contacts = [
    {
        name: 'Marc Nepal',
        phone: '981-3527732',
        link: 'https://www.google.com/search?q=marc+nepal&oq=marc+nepal&gs_lcrp=EgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyCggEEAAYDxgWGB4yCggFEAAYgAQYogQyCggGEAAYgAQYogQyCggHEAAYgAQYogTSAQgyMTYxajBqMagCCLACAQ&sourceid=chrome&ie=UTF-8#'
    },
    {
        name: 'National Trauma Centre',
        phone: '01-5326863',
        link: 'https://www.google.com/search?q=National+Trauma+Centre+&sca_esv=b95711e1819f9935&sca_upv=1&sxsrf=ADLYWIJi9xztkLm3hxVjrq0TQD5c6dH9AQ%3A1727410398109&ei=3jD2ZouuBoKF4-EPpLzRgAo&ved=0ahUKEwiLlaSZoeKIAxWCwjgGHSReFKAQ4dUDCA8&uact=5&oq=National+Trauma+Centre+'
    },
    {
        name: 'Relife Wellness Nepal',
        phone: '984-8385826',
        link: 'https://www.google.com/search?q=relife+wellness+nepal&sca_esv=b95711e1819f9935&sca_upv=1&sxsrf=ADLYWIJbSy_3RHe7oL6pJvH6Ree9oJ1oqQ%3A1727410453398&ei=FTH2Zvr3F8-E4-EP-JmB8A4'
    },
    {
        name: 'Happy Space Nepal',
        phone: '974-1662679',
        link: 'https://www.google.com/search?q=happy+space+nepal&sca_esv=b95711e1819f9935&sca_upv=1&sxsrf=ADLYWIJZTDNxHGll3ofGqQ4XTWLUALXu3g%3A1727410480390&ei=MDH2Zt28F8OD4-EPppqf0Qc'
    },
    {
        name: 'APF Trauma Care Centre',
        phone: '977 01-4315224/4313600',
        link: 'https://www.google.com/search?q=APF+trauma+care+centre'
    }
];

const TraumaCare = () => {
    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };

    return (
        <ScrollView style={styles.container}>
            {contacts.map((contact, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.name}>{contact.name}</Text>
                    <Text style={styles.phone}>{contact.phone}</Text>
                    <TouchableOpacity onPress={() => openLink(contact.link)}>
                        <Text style={styles.link}>More Info</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    address: {
        fontSize: 14,
        color: '#777',
        marginVertical: 5,
    },
    link: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});

export default TraumaCare;
