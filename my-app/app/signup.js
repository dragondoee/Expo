import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import BgImage from '../components/Theme';
import {Link} from'expo-router';

// fetch('http://localhost:8081/user/login', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email: 'yourValue',
//             first_name: 'yourOtherValue',
//             last_name: 'yourOtherValue',
//             password: 'yourOtherValue',
//             cpassword: 'yourOtherValue',
//         }),
//     });


// Formulaire d'inscription
const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <BgImage source={require('../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Inscription</Text>
        <Link style={styles.link} href='login'>Vous avez un compte ? Se connecter</Link>

        <Text style={styles.label}>Prénom :</Text>
        <TextInput style={styles.input} placeholder="Prénom" />

        <Text style={styles.label}>Nom :</Text>
        <TextInput style={styles.input} placeholder="Nom" />

        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirmer le mot de passe :</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>S&#39;inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
    </BgImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    width: 320,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#ffffffd2",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
      fontSize:13,
      textAlign:'center',
      textDecorationLine:'underline',
      textDecorationColor:"#e75480",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 3,
    marginBottom: 20,
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fafafaff",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#e75480",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 5,
    marginTop: 16,
    alignSelf: "flex-end", // remplace width: fit-content
  },
  buttonText: {
    color: "#e75480",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default SignupForm;
