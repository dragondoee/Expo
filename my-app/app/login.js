import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }
        Alert.alert('Connexion', `Email: ${email}\nPassword: ${password}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Connexion</Text>

                <Text style={styles.label}>Adresse Email :</Text>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    loginContainer: {
        maxWidth: 350,
        width: "90%",
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
        width: "fit-content",
        alignSelf: "flex-end",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
});

export default LoginScreen;