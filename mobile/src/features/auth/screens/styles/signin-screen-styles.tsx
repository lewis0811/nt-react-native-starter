import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';

type ISignInStyles = {
    container: ViewStyle;
    card: ViewStyle;
    headerSection: ViewStyle;
    iconOverlay: ViewStyle;
    signinIcon: ImageStyle;
    headingContainer: ViewStyle;
    heading: TextStyle;
    subtitle: TextStyle;
    tabContainer: ViewStyle;
    tabButton: ViewStyle;
    tabButtonActive: ViewStyle;
    tabButtonInactive: ViewStyle;
    tabText: TextStyle;
    tabTextActive: TextStyle;
    tabTextInactive: TextStyle;
    formSection: ViewStyle;
    fieldContainer: ViewStyle;
    label: TextStyle;
    input: ViewStyle;
    inputText: TextStyle;
    forgotPasswordLink: TextStyle;
    checkboxRow: ViewStyle;
    checkbox: ViewStyle;
    checkboxLabel: TextStyle;
    signInButton: ViewStyle;
    signInButtonText: TextStyle;
    biometricButton: ViewStyle;
    biometricButtonIcon: ImageStyle;
    biometricButtonText: TextStyle;
    dividerContainer: ViewStyle;
    dividerLine: ViewStyle;
    dividerText: TextStyle;
    socialButtonsContainer: ViewStyle;
    socialButton: ViewStyle;
    socialButtonIcon: ImageStyle;
    socialButtonText: TextStyle;
    footer: ViewStyle;
    footerText: TextStyle;
    footerLinkText: TextStyle;
};

export const styles = StyleSheet.create<ISignInStyles>({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        padding: 33,
        maxWidth: 448,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 25,
        elevation: 10,
    },
    headerSection: {
        height: 144,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconOverlay: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(13, 242, 242, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    signinIcon: {
        width: 32,
        height: 32,
    },
    headingContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
        width: '100%',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    tabButtonActive: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    tabButtonInactive: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#1f2937',
    },
    tabTextInactive: {
        color: '#6b7280',
    },
    formSection: {
        gap: 16,
        marginBottom: 24,
    },
    fieldContainer: {
        gap: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 13,
        paddingVertical: 11,
        height: 44,
    },
    inputText: {
        fontSize: 16,
        color: '#6b7280',
        flex: 1,
        paddingVertical: 0
    },
    forgotPasswordLink: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0df2f2',
        textAlign: 'right',
        marginTop: 8,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 4,
        backgroundColor: '#ffffff',
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#4b5563',
        marginLeft: 8,
    },
    signInButton: {
        backgroundColor: '#0df2f2',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    signInButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    biometricButton: {
        borderWidth: 2,
        borderColor: 'rgba(13, 242, 242, 0.3)',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    biometricButtonIcon: {
        width: 18,
        height: 20,
        marginRight: 8,
    },
    biometricButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0df2f2',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        fontSize: 14,
        color: '#6b7280',
        marginHorizontal: 8,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    socialButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    socialButtonIcon: {
        width: 20,
        height: 20,
    },
    socialButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#9ca3af',
        textAlign: 'center',
    },
    footerLinkText: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});