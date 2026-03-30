import React from 'react';
import { Image } from 'react-native';
import { tabIconStyle } from '../../navigation/styles/main-navigator-styles';

export const HomeTabIcon = ({ color, size }: { color: string; size: number }) => (
    <Image
        source={require('../../assets/images/home.png')}
        style={tabIconStyle(size, color)}
        resizeMode="contain"
    />
);

export const ProfileTabIcon = ({ color, size }: { color: string; size: number }) => (
    <Image
        source={require('../../assets/images/person.png')}
        style={tabIconStyle(size, color)}
        resizeMode="contain"
    />
);

export default {};
