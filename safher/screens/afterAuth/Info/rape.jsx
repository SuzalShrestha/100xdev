import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9', // Light background for readability
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Darker color for better contrast
    marginBottom: 16,
    textAlign: 'center', // Center the header for emphasis
  },
  subHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 16,
    marginBottom: 12,
  },
  paragraphText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, // Added line height for better readability
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4, // Slight elevation for depth
  },
  cardHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  cardContent: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});

const categories = [
  {
    title: 'Acquaintance Rape',
    description: [
      'Also referred as “date rape” and “hidden rape”.',
      'Happens between two people that know each other very well. In this form of sexual assault, the individuals implicated may have an existing social connection at the moment.',
      'Encompasses sexual assault perpetrated by an individual known to the victim, like a friend, associate, or romantic partner.',
      'Some victims may not identify acquaintance rape as such, but it’s crucial to understand that consent can be withdrawn at any time, and a previous relationship doesn’t exclude the possibility of rape.',
    ],
  },
  {
    title: 'Partner Rape',
    description: [
      'Also known as spousal rape.',
      'Type of rape involving a person’s current or former partner, regardless of marital status.',
      'Three types of partner rape:',
      '• Battering rape: involving both physical and sexual violence.',
      '• Force-only rape: involving the imposition of power and control over another.',
      '• Obsessive/Sadistic rape: involving torture and perverse sexual act.',
    ],
  },
  {
    title: 'Marital Rape',
    description: [
      'Involves sexual acts without consent within the context of a marital relationship.',
      'It encompasses any coerced sexual activity imposed on a partner within the confines of a marital relationship, where consent is not freely granted.',
    ],
  },
  {
    title: 'Gang Rape',
    description: [
      'Gang rape is a dreadful type of sexual assault where a single victim is subjected to an attack by a group of assailants.',
      'Several individuals collaborate to engage in sexual assault against the victim without their consent.',
      'Gang rape constitutes a serious infringement upon an individual’s bodily autonomy, frequently leading to profound physical and psychological trauma for the victim.',
    ],
  },
  {
    title: 'Statutory Rape',
    description: [
      'Engaging in sexual intercourse with a minor below the legal age of consent regardless of minor’s consent.',
      'Occurs when one party is under the age of consent, making any involvement in sexual activity with them statutory rape, even in the absence of force.',
    ],
  },
  {
    title: 'War Rape',
    description: [
      'It occurs in different ways, like mass rape, sexual slavery, or other forms of sexual abuse, leading to significant physical and psychological repercussions for the victims.',
      'War rape is the term used to describe instances of sexual violence, including rape, that occur during armed conflicts or wars.',
    ],
  },
  {
    title: 'Stranger Rape',
    description: [
      'Occurs when the assailant is unfamiliar to the victim and lacks any previous connection with them.',
      'Stranger rape may occur in diverse environments and situations, marked by the absence of any prior connection or familiarity between the victim and the perpetrator.',
    ],
  },
  {
    title: 'Incest Rape',
    description: [
      'Incest rape is characterized by sexual assault involving closely related family members, where one individual commits non-consensual sexual acts with another. This form of sexual violence takes place within the context of a familial relationship.',
      'It occurs between,',
      '• Parents and children.',
      '• Uncles and nieces or nephews.',
      '• Aunts and nieces or nephews.',
    ],
  },
  {
    title: 'Aggravated Rape',
    description: [
      'Aggravated rape is defined as rape with the use of force, threat of force, or while the victim is incapacitated or otherwise unable to give consent.',
      'It involves:',
      '• Coerced sex through threat of death or severe harm.',
      '• Non-consensual acts on an unconscious or drugged victim.',
      '• Sex acts with children under the legal age.',
    ],
  },
];

const FormsOfRape = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Forms/Categories of Rape</Text>

      {/* Categories */}
      {categories.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardHeader}>{item.title}</Text>
          {item.description.map((desc, i) => (
            <Text key={i} style={styles.cardContent}>
              {desc}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default FormsOfRape;
