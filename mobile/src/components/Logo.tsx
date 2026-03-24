import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';

import ImageAssets from '../assets/images';

export default function Logo() {
    return <Image source={ImageAssets.logo} style={styles.image} />;
}

type ILogoStyles = {
    image: ImageStyle;
};

const styles = StyleSheet.create<ILogoStyles>({
    image: {
        width: 64,
        height: 64,
        paddingBottom: 16,
        paddingTop: 16,
        alignSelf: 'center',
    },
});