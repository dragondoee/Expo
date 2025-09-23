import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.signupContainer}>
        <Text style={styles.title}>Inscription</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  signupContainer: {
    width: 320,
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
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
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
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#e75480",
    padding: 14,
    borderRadius: 5,
    marginTop: 16,
    alignSelf: "flex-end", // remplace width: fit-content
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default SignupForm;
