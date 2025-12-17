import { useState } from "react";
import { StyleSheet, Text, Alert } from 'react-native';
import useAuthStore from "../store/authStore";
import { Link } from 'expo-router';
import api from "../services/api";
import ButtonComponent from "../components/Button";
import ScreenContainer from '../components/Container';
import Input from "../components/Input";    

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken, setIsLoggedIn } = useAuthStore();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await api.post("/user/login", { email, password });

            if (response.status !== 200) {
                Alert.alert('Erreur', 'Identifiants incorrects');
                return;
            }

            const userData = response;

            setUser(userData.data);
            setToken(userData.token);
            setIsLoggedIn(true);

        } catch (error) {
            console.error("Erreur login:", error);
            Alert.alert("Erreur login:", error.message);
        }
    };

    return (
        <ScreenContainer title="Se connecter" link="Vous n&apos;avez de compte ? S&apos;inscrire" linkref="signup">
            <Input
                label="Email :"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Entrez votre email"
            />

            <Input
                label="Mot de passe :"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Entrez votre mot de passe"
            />

            <ButtonComponent title="Se connecter" onPress={handleLogin} />
        
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
    }
});

export default LoginScreen;