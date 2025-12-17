import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const ButtonComponent = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>  
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
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
        fontSize: 14,
        textAlign: "center",
        fontWeight: "600",
    }
});

export default ButtonComponent;