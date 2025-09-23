import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Profil() {
  const user={prenom:'Ana',nom:'Deschamps',email:'ana.deschamps@gmail.com'};
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>

        <MaterialCommunityIcons style={styles.imageAccount} name="account-circle" size={60} />
        <Text style={styles.title}>Profil</Text>

        <Text style={styles.label}>Identité</Text>
        <Text>{user.prenom} {user.nom}</Text>

        <Text style={styles.label}>Adresse email</Text>
        <Text>{user.email}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginContainer: {
        width: 300,
        paddingVertical: 24,
        paddingHorizontal: 24,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        textAlign: "center",
        marginBottom: 16,
        fontSize: 24,
        fontWeight: "bold",
    },
    label: {
        fontWeight: "bold",
        color: "#333",
        marginTop: 12,
    },
    imageAccount: {
        color: "#e75480",
        textAlign:"center",
    },
});

