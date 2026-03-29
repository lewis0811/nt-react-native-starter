import React, { FC, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { styles } from './styles/signin-screen-styles';
import useAuth from '../hooks/use-auth';

interface ISignInScreen {
    navigation: any;
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }) => {
    const { signIn, loading } = useAuth();
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [useBiometrics, setUseBiometrics] = useState(false);

    const handleSignIn = async () => {
        if (loading) return;
        try {
            await signIn({ username, password });
        } catch (error: any) {
            const msg = error || error?.response?.data?.message || 'Login failed. Please try again.';
            Alert.alert('Error', String(msg));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        {/* Header Section */}
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

                        {/* Tab Navigation */}
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === 'login'
                                        ? styles.tabButtonActive
                                        : styles.tabButtonInactive,
                                ]}
                                onPress={() => setActiveTab('login')}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === 'login'
                                            ? styles.tabTextActive
                                            : styles.tabTextInactive,
                                    ]}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.tabButton,
                                    activeTab === 'signup'
                                        ? styles.tabButtonActive
                                        : styles.tabButtonInactive,
                                ]}
                                onPress={() => setActiveTab('signup')}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === 'signup'
                                            ? styles.tabTextActive
                                            : styles.tabTextInactive,
                                    ]}
                                >
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Form Section */}
                        <View style={styles.formSection}>
                            {/* Username Field */}
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Username</Text>
                                <View style={styles.input}>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Enter your username"
                                        value={username}
                                        onChangeText={setUsername}
                                    />
                                </View>
                            </View>

                            {/* Password Field */}
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

                            {/* Forgot Password Link */}
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
                            </TouchableOpacity>

                            {/* Biometric Checkbox */}
                            <View style={styles.checkboxRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        useBiometrics && { backgroundColor: '#0df2f2' },
                                    ]}
                                    onPress={() => setUseBiometrics(!useBiometrics)}
                                >
                                    {useBiometrics && (
                                        <Text style={{ color: '#ffffff', textAlign: 'center' }}>✓</Text>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.checkboxLabel}>Use biometrics for faster login</Text>
                            </View>

                            {/* Sign In Button */}
                            <TouchableOpacity
                                style={styles.signInButton}
                                onPress={handleSignIn}
                                activeOpacity={0.8}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#000" />
                                ) : (
                                    <Text style={styles.signInButtonText}>Sign In</Text>
                                )}
                            </TouchableOpacity>

                            {/* Biometric Sign In Button */}
                            <TouchableOpacity
                                style={styles.biometricButton}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={require('../../../assets/images/biometric_icon.png')}
                                    style={styles.biometricButtonIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.biometricButtonText}>Sign in with Biometrics</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>Or continue with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Social Buttons */}
                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity
                                style={styles.socialButton}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={require('../../../assets/images/google_icon.png')}
                                    style={styles.socialButtonIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.socialButtonText}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.socialButton}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={require('../../../assets/images/facebook_icon.png')}
                                    style={styles.socialButtonIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.socialButtonText}>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                By continuing, you agree to our{' '}
                                <Text style={styles.footerLinkText}>Terms of Service</Text>
                                {'\n'}and{' '}
                                <Text style={styles.footerLinkText}>Privacy Policy</Text>.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
