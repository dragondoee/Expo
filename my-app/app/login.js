import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import useAuthStore from "../store/authStore";
import BgImage from '../components/Theme';
import { Link } from 'expo-router';
import api from "../services/api";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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
        <BgImage source={require('../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Text style={styles.title}>Connexion</Text>
                        <Link style={styles.link} href='signup'>Vous n&apos;avez de compte ? S&apos;inscrire</Link>

                        <Text style={styles.label}>Adresse email :</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Entrez votre email"
                        />

                        <Text style={styles.label}>Mot de passe :</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Entrez votre mot de passe"
                        />

                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Se connecter</Text>
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
        /* backgroundColor: "red", */
    },
    loginContainer: {
        width: 300,
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
        backgroundColor: "#fafafa",
    },
    button: {
        backgroundColor: "white",
        borderWidth: 1.5,
        borderColor: "#e75480",
        paddingHorizontal: 13,
        paddingVertical: 9,
        padding: 14,
        borderRadius: 5,
        marginTop: 16,
        width: "fit-content",
        alignSelf: "flex-end",
    },
    buttonText: {
        color: "#e75480",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
});

export default LoginScreen;