import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const BgImage = ({ source, children, style }) => (
    <ImageBackground source={source} style={[styles.background, style]}>
        <View style={styles.overlay}>
            {children}
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default BgImage;