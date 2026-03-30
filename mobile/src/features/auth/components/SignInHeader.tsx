import React, { FC } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../screens/styles/signin-screen-styles';

export const SignInHeader: FC = () => (
    <View style={styles.headerSection}>
        <View style={styles.iconOverlay}>
            <Image
                source={require('../../../assets/images/lock_icon.png')}
                style={styles.signinIcon}
                resizeMode="contain"
            />
        </View>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subtitle}>Please enter your details</Text>
        </View>
    </View>
);

export default SignInHeader;