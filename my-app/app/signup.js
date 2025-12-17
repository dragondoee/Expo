import { React, useState } from "react";
import { StyleSheet, Text, TextInput, Alert } from "react-native";
import useAuthStore from "../store/authStore";
import api from "../services/api";
import ButtonComponent from "@/components/Button";
import ScreenContainer from '../components/Container';
import Input from "../components/Input";


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
    <ScreenContainer title="Inscription" link="Vous avez un compte ? Se connecter" linkref="login">

            <Input
              label="Prénom :"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Prénom"
            />

            <Input
              label="Nom :"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Nom"
            />

            <Input
              label="Email :"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
            />

            <Input
              label="Mot de passe :"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Mot de passe"
            />

            <Input
              label="Confirmer le mot de passe :"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirmer le mot de passe"
            />

            <ButtonComponent title="S'inscrire" onPress={handleSignup} />

    </ScreenContainer>
  );
};


export default SignupForm;
