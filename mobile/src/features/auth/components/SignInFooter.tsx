import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../screens/styles/signin-screen-styles';

export const SignInFooter: FC = () => (
    <View style={styles.footer}>
        <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.footerLinkText}>Terms of Service</Text>
            {'\n'}and{' '}
            <Text style={styles.footerLinkText}>Privacy Policy</Text>.
        </Text>
    </View>
);

export default SignInFooter;