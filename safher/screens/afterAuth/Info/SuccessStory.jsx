import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const successStories = [
    {
        title: "Anjali's Journey to Justice",
        story: `"I always thought I was strong enough to handle everything on my own. But that evening when I was harassed while heading home, I felt completely helpless. I remembered the SafHer app and immediately hit the SOS button. Within minutes, the police arrived, and the perpetrator was caught. What I didn’t expect was the continuous support I received afterward. SafHer connected me with legal advisors who helped me file a case and navigate the legal process, something I couldn’t have done alone. Today, I’m not just a survivor; I’m a fighter, thanks to SafHer."`
    },
    {
        title: "Mina's Empowerment",
        story: `"Living in a rural area, I never knew my rights or where to go for help. When I faced harassment, I felt lost and alone. But then I learned about SafHer through a friend. The app didn’t just give me immediate help—it educated me about my rights and connected me with local organizations that provided support. I now feel empowered to speak up, not just for myself but for other women in my community. SafHer is more than an app; it's a lifeline for women like me."`
    },
    {
        title: "Sita's Confidence Rebuilt",
        story: `"After a traumatic incident on my way back from college, I felt afraid to even step outside. But SafHer became my safe space. The ‘Follow Me’ feature allowed me to share my location with my family, and knowing they were watching made me feel secure. I was also able to access counseling services through the app, which helped me rebuild my confidence. I’m back to my studies now, stronger and braver than ever before. I’m grateful for SafHer for giving me the courage to reclaim my life."`
    },
    {
        title: "Neha's New Beginning",
        story: `"I was stuck in an abusive relationship for years, not knowing where to turn for help. One day, a colleague recommended SafHer. I reached out through the app and was connected to support groups and legal assistance. It took time, but I was able to safely leave the relationship and start over. SafHer didn’t just help me in an emergency; it gave me the resources to rebuild my life. Now, I volunteer to support other women who are where I once was, giving back the help I received."`
    }
];

const SuccessStoriesCards = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleStoryExpansion = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand the selected story
        }
    };

    return (
        <ScrollView style={styles.container}>
            {successStories.map((story, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.title}>{story.title}</Text>
                    <Text style={styles.story}>
                        {expandedIndex === index
                            ? story.story // Show full story if expanded
                            : story.story.slice(0, 120) + "... "} {/* Show preview */}
                        {expandedIndex !== index && (
                            <TouchableOpacity onPress={() => toggleStoryExpansion(index)}>
                                <Text style={styles.seeMore}>See more</Text>
                            </TouchableOpacity>
                        )}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    story: {
        fontSize: 14,
        color: '#555',
    },
    seeMore: {
        color: '#007BFF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default SuccessStoriesCards;
