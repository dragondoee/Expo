import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import BgImage from '../../components/Theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useAuthStore from "../../store/authStore";
import { Button } from '@react-navigation/elements';

export default function Profil() {
  const user= useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  
  const editUser = () => {
    // Logic to edit user profile
  };
  const deleteUser = () => {
    // Logic to delete user profile
  };

  return (
    <BgImage source={require('../../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
    <View style={styles.container}>
      <View style={styles.loginContainer}>

        <MaterialCommunityIcons style={styles.imageAccount} name="account-circle" size={60} />
        <Text style={styles.title}>Profile</Text>

        <Text style={styles.label}>Identité</Text>
        <Text>{user.first_name} {user.last_name}</Text>

        <Text style={styles.label}>Adresse email</Text>
        <Text>{user.email}</Text>

        <View>
          <Button onPress={editUser}> Modifier </Button> {/* styliser + icon */}
          <Button onPress={deleteUser}> Supprimer </Button> {/* styliser + icon */}
        </View>

      </View>

      <Button onPress={logout}> Se déconnecter </Button> {/* styliser + icon */}

    </View>
    </BgImage>
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

