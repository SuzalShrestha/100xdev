import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import FormsOfRape from './rape';
import RapeCaseProcedure from './rape-procedding';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9', // Light background for readability
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333', // Darker color for better contrast
    marginBottom: 16,
    textAlign: 'center', // Center the header for emphasis
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
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
  noteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 16,
    marginBottom: 10,
    textAlign: 'left',
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

const procedures = [
  {
    step: '1. Complaint Filing',
    description:
      'Complaint to be filed by the victim or someone on behalf of the victim at the nearest police station within the crime jurisdiction.',
  },
  {
    step: '2. Statement Taken',
    description:
      'Statement of the victim to be taken by the police officer, who may ask questions related to the incident.',
  },
  {
    step: '3. Detailed Statement',
    description:
      'Victim gives a detailed statement, including information about the incident, time, date, location, and if known, details of the suspect.',
  },
  {
    step: '4. Investigation',
    description:
      'The police carry out an investigation, which includes the collection of evidence and witness examination.',
  },
  {
    step: '5. Medical Examination',
    description:
      'The victim undergoes a medical examination to document physical injuries and gather forensic evidence.',
  },
  {
    step: '6. FIR Registration',
    description:
      'If the investigation finds sufficient evidence, the police register the FIR (First Information Report) to proceed with legal action.',
  },
  {
    step: '7. Suspect Arrest',
    description:
      'The suspect is arrested by the police if sufficient evidence supports the allegation.',
  },
  {
    step: '8. Interrogation',
    description:
      'The suspect undergoes interrogation, and their statement is taken.',
  },
  {
    step: '9. Case Sent to Attorney',
    description:
      'The case file is sent to the Government Attorney for further proceedings in court after the police complete their investigation.',
  },
  {
    step: '10. Charge Sheet',
    description:
      'The Government Attorney prepares the charge sheet against the suspect, including evidence, witness statements, and proposed punishment.',
  },
];

function Laws() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>
        Rape Laws and Legal Procedures in Nepal
      </Text>
      <Text style={styles.introText}>
        (This article helps you understand the legal provisions of rape in
        Nepal.)
      </Text>

      {/* Introduction */}
      <Text style={styles.subHeaderText}>Introduction</Text>
      <Text style={styles.paragraphText}>
        Rape as defined in the National Criminal Code, 2074:
      </Text>
      <Text style={styles.paragraphText}>
        If a man engages in sexual intercourse with a woman without her consent
        or with a girl child under the age of 18, it is regarded as committing
        rape.
      </Text>

      {/* Things to Consider */}
      <Text style={styles.subHeaderText}>Things to Consider</Text>
      <Text style={styles.paragraphText}>
        Consent is invalid if obtained through coercion, intimidation,
        misrepresentation, or kidnapping. Various forms of penetration,
        including non-consensual oral and anal, are considered forms of rape.
      </Text>

      {/* Relevant Laws */}
      <Text style={styles.subHeaderText}>Relevant Laws</Text>
      <Text style={styles.paragraphText}>
        The governing laws for rape in Nepal include:
      </Text>
      <Text style={styles.paragraphText}>
        - The National Criminal Code, 2074
      </Text>
      <Text style={styles.paragraphText}>
        - The National Criminal Procedure Code, 2074
      </Text>
      <Text style={styles.paragraphText}>
        - The Criminal Offence (Sentencing and Punishment) Act, 2074
      </Text>

      {/* Legal Procedure */}
      <Text style={styles.subHeaderText}>Legal Procedure for Rape Cases</Text>
      {procedures.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardHeader}>{item.step}</Text>
          <Text style={styles.cardContent}>{item.description}</Text>
        </View>
      ))}

      {/* Notes */}
      <Text style={styles.noteText}>
        **Note:** The victim can request a female officer if they feel
        uncomfortable giving a statement.
      </Text>
      <Text style={styles.noteText}>
        *The victim's real name will not be disclosed during the legal process.*
      </Text>
      <FormsOfRape />
      <RapeCaseProcedure />
    </ScrollView>
  );
}

export default Laws;
