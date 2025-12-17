import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';

const Input = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
    return (
        <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText} />
        </>
    );
}

const styles = StyleSheet.create({
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
  }
});

export default Input;
