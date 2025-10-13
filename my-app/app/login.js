import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import BgImage from '../components/Theme';
import {Link} from'expo-router';
import api from "../services/api";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await api.post("/user/login", { email, password });

            console.log("[LOGIN RESPONSE]", response);

            // Si l'appel n'est pas "ok"
            if (!response.ok || response.status !== 200) {
            // Erreur 401 → mauvais identifiants
            if (response.status === 401) {
                Alert.alert('Erreur', 'Adresse email ou mot de passe incorrect.');
            } else {
                // Autre erreur (serveur, réseau…)
                Alert.alert('Erreur', `Problème de connexion (${response.status})`);
            }
            return;
            }

            // Si tout est bon
            const userData = response.data || {};
            setUser(userData);

            Alert.alert('Connexion réussie', `Bienvenue ${userData.first_name || email}!`);

        } catch (error) {
            console.error("Erreur login:", error);
            Alert.alert('Erreur', 'Impossible de se connecter au serveur.');
        }
    };



    return (
        <BgImage source={require('../assets/images/bg.png')} style={{ flex: 1, width: '100%', height: '100%' }}>
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