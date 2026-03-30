import React, { FC } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from '../screens/styles/signin-screen-styles';

export const SocialButtons: FC = () => (
    <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Image
                source={require('../../../assets/images/google_icon.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Image
                source={require('../../../assets/images/facebook_icon.png')}
                style={styles.socialButtonIcon}
                resizeMode="contain"
            />
            <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
    </View>
);

export default SocialButtons;