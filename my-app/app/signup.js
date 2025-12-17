import { React, useState } from "react";
import { StyleSheet, Text, TextInput, Alert } from "react-native";
import useAuthStore from "../store/authStore";
import api from "../services/api";
import { Link } from 'expo-router';
import ButtonComponent from "@/components/Button";
import ScreenContainer from '../components/Container';


// formulaire d'inscription
const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { setUser, setToken, setIsLoggedIn } = useAuthStore();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await api.post("/user/signup", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        cpassword: confirmPassword,
      });

      if (response.data.ok === false) {
        Alert.alert("Erreur", response.data.message || "Erreur d'inscription");
        return;
      }
      const userData = response;

      setUser(userData.data);
      setToken(userData.token);
      setIsLoggedIn(true);

      Alert.alert("Inscription réussie", `Bienvenue ${userData.data.first_name}!`);

    } catch (error) {
      console.log("Erreur signup:", error.message);

      Alert.alert(
        "Erreur",
        error.message || "Erreur pendant l'inscription"
      );
    }
  };

  return (
    <ScreenContainer>
            <Text style={styles.title}>Inscription</Text>
            <Link style={styles.link} href='login'>Vous avez un compte ? Se connecter</Link>

            <Text style={styles.label}>Prénom :</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Nom :</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={lastName}
              onChangeText={setLastName}
            />

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

            <ButtonComponent title="S'inscrire" onPress={handleSignup} />

    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    fontSize: 13,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: "#e75480",
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
});

export default SignupForm;
