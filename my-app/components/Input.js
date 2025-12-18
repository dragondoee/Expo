import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, TouchableOpacity, View } from 'react-native';

const Input = ({ label, placeholder, value, onChangeText, isPassword, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    secureTextEntry={isPassword ? !showPassword : false}
                    value={value}
                    onChangeText={onChangeText}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity 
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.iconContainer}
                    >
                        <Ionicons 
                            name={showPassword ? 'eye-off' : 'eye'} 
                            size={20} 
                            color="#666" 
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        marginTop: 15,
    },
    label: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        width: "100%",
        padding: 10,
        paddingRight: 45, // Espace pour ne pas que le texte passe sous l'icône
        borderWidth: 1.3,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fafafaff",
    },
    iconContainer: {
        position: 'absolute',
        right: 15,
        height: '100%',
        justifyContent: 'center',
    }
});

export default Input;