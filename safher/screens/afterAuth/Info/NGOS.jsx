import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NGOsList = () => {
    const ngos = [
        {
            name: 'Hamro Palo',
            address: 'Neel Sarswoti Marg 52, Kathmandu',
            phone: '01-4539762',
        },
        {
            name: 'Youth For Human Rights Campaign Nepal - YHRC NEPAL',
            address: 'Kathmandu',
            phone: '01-4791087',
        },
        {
            name: 'The Himalayan Innovative Society (THIS)',
            address: 'Lamingtan Marg, Kathmandu',
            phone: '01-4437306',
        },
        {
            name: 'Aaroh Nepal',
            address: 'Kathmandu',
            phone: '+977 - 01 - 6924469',
        },
        {
            name: 'Creating Possibilities Nepal',
            address: 'Bhairavi Marg, Kathmandu',
            phone: '01-4008617',
        },
        {
            name: 'Diyalo Pariwar',
            address: 'NGO Rd, Bharatpur 44207',
            phone: '056-527534',
        },
        {
            name: 'FAITH - Friends Affected And Infected Together In Hand',
            address: 'Kupondol Road, Lalitpur, Kathmandu',
            phone: '01-5412012',
        },
        {
            name: 'NGO Federation Of Nepal - NFN',
            address: 'बुद्ध मार्ग, Kathmandu',
            phone: '01-4781368',
        },
        {
            name: 'Basundhara Helping Hands - BHH Nepal',
            address: 'Kathmandu',
            phone: 'N/A',
        },
        {
            name: 'HBCS',
            address: 'Kathmandu',
            phone: 'N/A',
        },
    ];

    return (
        <ScrollView style={styles.container}>
            {ngos.map((ngo, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.header}>{ngo.name}</Text>
                    <Text style={styles.address}>{ngo.address}</Text>
                    <Text style={styles.phone}>{ngo.phone}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3, // For Android shadow
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#555',
    },
    phone: {
        fontSize: 12,
        color: '#777',
    },
});

export default NGOsList;
