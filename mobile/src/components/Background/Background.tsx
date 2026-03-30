import React from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../../assets/styles';

import ImageAssets from '../../assets/images';

export default function Background({ children }: any) {
    return (
        <ImageBackground
            source={ImageAssets.background_dot}
            resizeMode="repeat"
            style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

type IBackgroundStyles = {
    container: ViewStyle;
    text: TextStyle;
    background: ViewStyle;
};

const styles = StyleSheet.create<IBackgroundStyles>({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background.overlay,
    },
    text: {
        fontSize: theme.typography.size.lg,
        color: theme.palette.black,
    },
});
