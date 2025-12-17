import { useState } from "react";
import { Alert } from 'react-native';
import useAuthStore from "../store/authStore";
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
                Alert.alert('Erreur', response.message || response.code || 'Identifiants incorrects');
                return;
            }

            const userData = response;

            setUser(userData.data);
            setToken(userData.token);
            setIsLoggedIn(true);

        } catch (error) {
            console.error("Erreur login:", error);
            Alert.alert("Erreur login:", error.message || error.code || "Erreur lors de la connexion");
        }
    };

    return (
        <ScreenContainer title="Se connecter" link="Vous n'avez pas de compte ? S'inscrire" linkref="signup">
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


export default LoginScreen;