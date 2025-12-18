import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BgImage from './Theme';
import { Link } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const ScreenContainer = ({ title, link, linkref, backlink, children, style }) => {
    return (
        <BgImage 
            source={require('../assets/images/bg.png')} 
            style={{ flex: 1, width: '100%', height: '100%' }}
        >
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraScrollHeight={100} 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={[styles.container, style]} >

                    {backlink && <Link href={backlink} style={styles.backButton}>
                        <Ionicons name="arrow-back-outline" size={16} color="white" />
                            Retour
                    </Link>}

                    <View style={styles.innerContainer}>

                        {title && <Text style={styles.title}>{title}</Text>}
                        {link && linkref && <Link style={styles.link} href={linkref}>{link}</Link>}
                        
                        {children}

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
    },
    innerContainer: {
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
    backButton: {
        marginRight: "auto",
        zIndex: 1,
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        backgroundColor: '#00000034',
        padding: 8,
        borderRadius: 5,
        marginBottom: 20,
  },
});

export default ScreenContainer;