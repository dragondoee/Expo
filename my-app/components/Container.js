import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BgImage from './Theme';
import { Link } from 'expo-router';

const ScreenContainer = ({ title, link, linkref, children }) => {
    return (
        <BgImage 
            source={require('../assets/images/bg.png')} 
            style={{ flex: 1, width: '100%', height: '100%' }}
        >
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraScrollHeight={50} 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <View style={styles.innerContainer}>

                        {<Text style={styles.title}>{title}</Text>}
                        <Link style={styles.link} href={linkref}>{link}</Link>
                        
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
    }
});

export default ScreenContainer;