import { React, useState } from "react";
import { Alert, Text, View } from "react-native";
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

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
      return;
    }

    try {
      const response = await api.post("/user/signup", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      if (response.status !== 200) {
        Alert.alert("Erreur", response.message || response.code || "Erreur d'inscription");
        return;
      }
      const userData = response;

      setUser(userData.data);
      setToken(userData.token);
      setIsLoggedIn(true);

      Alert.alert("Inscription réussie", `Bienvenue ${userData.data.first_name}!`);

    } catch (error) {
      console.log("Erreur signup:", error.message || error.code);

      Alert.alert(
        "Erreur",
        error.message || error.code || "Erreur pendant l'inscription"
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              label="* Email :"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
            />

              <Input
                label="* Mot de passe :"
                value={password}
                onChangeText={setPassword}
                placeholder="Mot de passe"
                isPassword={true}
              />

              <Text style={{ fontSize: 12, color: '#646464ff', marginBottom: 15 }}>
                  8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
              </Text>

            <Input
              label="* Confirmer le mot de passe :"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholder="Confirmer le mot de passe"
              isPassword={true}
            />

            <Text style={{ fontSize: 12, color: '#646464ff', marginBottom: 10 }}>* Champs obligatoires</Text>

            <ButtonComponent title="S'inscrire" onPress={handleSignup} />

    </ScreenContainer>
  );
};


export default SignupForm;
