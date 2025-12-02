import { React, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import useAuthStore from "../store/authStore";
import api from "../services/api";
import BgImage from '../components/Theme';
import { Link } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


// Formulaire d'inscription
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

      if (!response.data.ok) {
        Alert.alert("Erreur", response.data.message || "Erreur d'inscription");
        return;
      }
      const { token, data } = response.data;

      setUser(data);
      setToken(token);
      setIsLoggedIn(true);

      Alert.alert("Inscription réussie", `Bienvenue ${data.first_name}!`);

    } catch (error) {
      console.log("Erreur signup:", error.response?.data);

      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Erreur pendant l'inscription"
      );
    }
  };

  return (
    <BgImage source={require('../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={40}
      >
        <View style={styles.container}>
          <View style={styles.signupContainer}>
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

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>S&#39;inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
