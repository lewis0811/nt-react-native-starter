import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { theme } from '../../../../assets/styles';

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
    safeArea: ViewStyle;
    keyboardView: ViewStyle;
    checkboxActive: ViewStyle;
    checkmarkText: TextStyle;
};

export const styles = StyleSheet.create<ISignInStyles>({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.page,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing[4],
    },
    card: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        padding: 33,
        maxWidth: 448,
        width: '100%',
        ...theme.shadow.xl,
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
        backgroundColor: theme.colors.brand.subtle,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing[4],
    },
    signinIcon: {
        width: 32,
        height: 32,
    },
    headingContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing[2],
    },
    heading: {
        fontSize: theme.typography.size['3xl'],
        fontWeight: theme.typography.weight.bold,
        color: theme.colors.text.heading,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: theme.typography.size.md,
        color: theme.colors.text.muted,
        textAlign: 'center',
        marginTop: theme.spacing[1],
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background.surface,
        borderRadius: theme.radius.xl,
        padding: theme.spacing[1],
        marginBottom: theme.spacing[6],
        width: '100%',
    },
    tabButton: {
        flex: 1,
        paddingVertical: theme.spacing[2],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.radius.xl,
    },
    tabButtonActive: {
        backgroundColor: theme.colors.background.card,
        ...theme.shadow.xs,
    },
    tabButtonInactive: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: theme.typography.size.base,
        fontWeight: theme.typography.weight.medium,
    },
    tabTextActive: {
        color: theme.colors.text.heading,
    },
    tabTextInactive: {
        color: theme.colors.text.muted,
    },
    formSection: {
        gap: theme.spacing[4],
        marginBottom: theme.spacing[6],
    },
    fieldContainer: {
        gap: theme.spacing[1],
    },
    label: {
        fontSize: theme.typography.size.base,
        fontWeight: theme.typography.weight.medium,
        color: theme.colors.text.body,
    },
    input: {
        backgroundColor: theme.colors.background.input,
        borderWidth: 1,
        borderColor: theme.colors.border.input,
        borderRadius: theme.radius.xl,
        paddingHorizontal: 13,
        paddingVertical: 11,
        height: 44,
    },
    inputText: {
        fontSize: theme.typography.size.md,
        color: theme.colors.text.muted,
        flex: 1,
        paddingVertical: 0,
    },
    forgotPasswordLink: {
        fontSize: theme.typography.size.base,
        fontWeight: theme.typography.weight.medium,
        color: theme.colors.brand.primary,
        textAlign: 'right',
        marginTop: theme.spacing[2],
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing[4],
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: theme.colors.border.input,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colors.background.card,
    },
    checkboxLabel: {
        fontSize: theme.typography.size.base,
        color: theme.colors.text.secondary,
        marginLeft: theme.spacing[2],
    },
    signInButton: {
        backgroundColor: theme.colors.brand.primary,
        borderRadius: theme.radius.xl,
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[4],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing[4],
        ...theme.shadow.lg,
    },
    signInButtonText: {
        fontSize: theme.typography.size.md,
        fontWeight: theme.typography.weight.bold,
        color: theme.colors.text.dark,
    },
    biometricButton: {
        borderWidth: 2,
        borderColor: theme.colors.brand.subtleBorder,
        borderRadius: theme.radius.xl,
        paddingVertical: 14,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing[6],
    },
    biometricButtonIcon: {
        width: 18,
        height: 20,
        marginRight: theme.spacing[2],
    },
    biometricButtonText: {
        fontSize: theme.typography.size.md,
        fontWeight: theme.typography.weight.semibold,
        color: theme.colors.brand.primary,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing[6],
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.border.default,
    },
    dividerText: {
        fontSize: theme.typography.size.base,
        color: theme.colors.text.muted,
        marginHorizontal: theme.spacing[2],
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        gap: theme.spacing[4],
        marginBottom: theme.spacing[6],
    },
    socialButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.border.default,
        borderRadius: theme.radius.xl,
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing[2],
    },
    socialButtonIcon: {
        width: 20,
        height: 20,
    },
    socialButtonText: {
        fontSize: theme.typography.size.base,
        fontWeight: theme.typography.weight.medium,
        color: theme.colors.text.body,
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: theme.typography.size.xs,
        color: theme.colors.text.disabled,
        textAlign: 'center',
    },
    footerLinkText: {
        fontSize: theme.typography.size.xs,
        color: theme.colors.text.body,
        fontWeight: theme.typography.weight.medium,
        textDecorationLine: 'underline',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    checkboxActive: {
        backgroundColor: theme.colors.brand.primary,
    },
    checkmarkText: {
        color: theme.colors.text.inverted,
        textAlign: 'center',
    },
});
