import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginBottom: 16,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E3E3E',
    marginTop: 16,
    marginBottom: 12,
  },
  paragraphText: {
    fontSize: 16,
    color: '#4E4E4E',
    lineHeight: 24,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7E7E7E',
    marginTop: 16,
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E4E4E',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
});

function RapeCaseProcedure() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>
        Legal Procedure of Rape Case in Nepal
      </Text>

      {/* Section A: Complaint Filing */}
      <Text style={styles.subHeaderText}>
        A. Procedure for Complaint Filing for Rape Case in the Police Station
      </Text>
      <Text style={styles.paragraphText}>
        Rape is considered a grievous act globally and is a serious criminal
        offense. Anyone can file a complaint on behalf of the victim.
      </Text>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 1:</Text>
        <Text style={styles.paragraphText}>
          The complaint can be filed by the victim or someone on behalf of the
          victim at the nearest police station within the crime jurisdiction.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 2:</Text>
        <Text style={styles.paragraphText}>
          The police officer takes the victim's statement, asking questions
          related to the incident if necessary.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 3:</Text>
        <Text style={styles.paragraphText}>
          The victim provides a detailed statement including information about
          the incident, time, date, location, and any details of the suspect.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 4:</Text>
        <Text style={styles.paragraphText}>
          The police conduct an investigation, which includes collecting
          evidence and examining witnesses.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 5:</Text>
        <Text style={styles.paragraphText}>
          The victim undergoes a medical examination to document physical
          injuries and gather forensic evidence.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 6:</Text>
        <Text style={styles.paragraphText}>
          If sufficient evidence is found, the police register the FIR (First
          Information Report) to proceed with legal action.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 7:</Text>
        <Text style={styles.paragraphText}>
          The suspect is arrested by the police if the evidence supports the
          allegation.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 8:</Text>
        <Text style={styles.paragraphText}>
          The suspect is interrogated, and their statement is recorded.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 9:</Text>
        <Text style={styles.paragraphText}>
          The case file is sent to the Government Attorney for further court
          proceedings after the police investigation is completed.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 10:</Text>
        <Text style={styles.paragraphText}>
          The Government Attorney prepares the charge sheet against the suspect,
          which includes evidence, witness statements, details of the rape, and
          the proposed punishment.
        </Text>
      </View>

      <Text style={styles.noteText}>
        *Note: The victim may request a female officer if they feel
        uncomfortable giving a statement in the police station.*
      </Text>
      <Text style={styles.noteText}>
        *The victim's real name will not be disclosed during the legal process.*
      </Text>

      {/* Section B: Legal Case Proceeding in Court */}
      <Text style={styles.subHeaderText}>
        B. Legal Case Proceeding of Rape in the Court
      </Text>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 1:</Text>
        <Text style={styles.paragraphText}>
          The Government of Nepal files the case in court on behalf of the
          victim.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 2:</Text>
        <Text style={styles.paragraphText}>
          The court schedules a date for the bail hearing.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 3:</Text>
        <Text style={styles.paragraphText}>
          The suspect's statement is taken, and the bail hearing is conducted in
          the court's bench.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 4:</Text>
        <Text style={styles.paragraphText}>
          The judge decides whether to grant bail or order the suspect to remain
          in judicial custody for further proceedings.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 5:</Text>
        <Text style={styles.paragraphText}>
          The trial begins in court, and the proceedings are held in a closed
          session to protect the victim's privacy.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 6:</Text>
        <Text style={styles.paragraphText}>
          Examination of witnesses, expert opinions on medical reports, evidence
          examination, and statements of the accused and other suspects are
          conducted.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 7:</Text>
        <Text style={styles.paragraphText}>
          Case arguments are presented between the Government Attorney and the
          defense counsel lawyer.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 8:</Text>
        <Text style={styles.paragraphText}>
          The court may issue various orders at different phases of the trial
          process.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 9:</Text>
        <Text style={styles.paragraphText}>
          After reviewing the evidence, witness testimonies, and expert
          opinions, the court delivers a verdict on whether the suspect is
          guilty or innocent.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.stepText}>Step 10:</Text>
        <Text style={styles.paragraphText}>
          Post-verdict, the court decides the punishment if the suspect is found
          guilty.
        </Text>
      </View>
    </ScrollView>
  );
}

export default RapeCaseProcedure;
