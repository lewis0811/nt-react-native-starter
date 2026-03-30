import React, { FC, useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { styles } from './styles/signin-screen-styles';
import useAuth from '../hooks/use-auth';
import {
    SignInHeader,
    SignInForm,
    SocialButtons,
    SignInFooter,
} from '../components';

interface ISignInScreen {
    navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }) => {
    const { signIn, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [useBiometrics, setUseBiometrics] = useState(false);

    const handleSignIn = useCallback(async () => {
        if (loading) return;
        try {
            await signIn({ username, password });
        } catch (error: any) {
            Alert.alert('Error', String(error));
        }
    }, [loading, signIn, username, password]);

    const switchToLogin = useCallback(() => setActiveTab('login'), []);
    const switchToSignup = useCallback(() => setActiveTab('signup'), []);
    const toggleBiometrics = useCallback(() => setUseBiometrics((prev) => !prev), []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <View style={styles.card}>
                        <SignInHeader />

                        <SignInForm
                            activeTab={activeTab}
                            switchToLogin={switchToLogin}
                            switchToSignup={switchToSignup}
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            useBiometrics={useBiometrics}
                            toggleBiometrics={toggleBiometrics}
                            handleSignIn={handleSignIn}
                            loading={loading}
                        />

                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>Or continue with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <SocialButtons />
                        <SignInFooter />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};