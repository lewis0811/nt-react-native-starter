import React, { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import LoadingScreen from '../../../components/LoadingScreen';
import { styles } from '../screens/styles/signin-screen-styles';

interface SignInFormProps {
    activeTab: 'login' | 'signup';
    switchToLogin: () => void;
    switchToSignup: () => void;
    username: string;
    setUsername: (text: string) => void;
    password: string;
    setPassword: (text: string) => void;
    useBiometrics: boolean;
    toggleBiometrics: () => void;
    handleSignIn: () => Promise<void> | void;
    loading: boolean;
}

export const SignInForm: FC<SignInFormProps> = ({
    activeTab,
    switchToLogin,
    switchToSignup,
    username,
    setUsername,
    password,
    setPassword,
    useBiometrics,
    toggleBiometrics,
    handleSignIn,
    loading,
}) => (
    <View style={styles.formSection}>
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[
                    styles.tabButton,
                    activeTab === 'login' ? styles.tabButtonActive : styles.tabButtonInactive,
                ]}
                onPress={switchToLogin}
            >
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'login' ? styles.tabTextActive : styles.tabTextInactive,
                    ]}
                >
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tabButton,
                    activeTab === 'signup' ? styles.tabButtonActive : styles.tabButtonInactive,
                ]}
                onPress={switchToSignup}
            >
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'signup' ? styles.tabTextActive : styles.tabTextInactive,
                    ]}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.input}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            </View>
        </View>

        <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.input}>
                <TextInput
                    style={styles.inputText}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
        </View>

        <TouchableOpacity>
            <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.checkboxRow}>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    useBiometrics && styles.checkboxActive,
                ]}
                onPress={toggleBiometrics}
            >
                {useBiometrics && <Text style={styles.checkmarkText}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Use biometrics for faster login</Text>
        </View>

        <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
            disabled={loading}
        >
            {loading ? (
                <LoadingScreen testID="signin-loading" size="small" color="#000" inline />
            ) : (
                <Text style={styles.signInButtonText}>Sign In</Text>
            )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.biometricButton} activeOpacity={0.8}>
            <Image
                source={require('../../../assets/images/biometric_icon.png')}
                style={styles.biometricButtonIcon}
                resizeMode="contain"
            />
            <Text style={styles.biometricButtonText}>Sign in with Biometrics</Text>
        </TouchableOpacity>
    </View>
);

export default SignInForm;