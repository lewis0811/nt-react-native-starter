import { StyleSheet } from 'react-native';
import { theme } from '../../../../assets/styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.page,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hero: {
        width: '100%',
        height: 320,
        backgroundColor: theme.colors.background.surface,
    },
    card: {
        padding: theme.spacing[4],
    },
    sectionCard: {
        backgroundColor: theme.colors.background.card,
        padding: theme.spacing[4],
        marginTop: theme.spacing[3],
    },
    badge: {
        color: theme.colors.brand.dark,
        fontWeight: theme.typography.weight.bold,
        marginBottom: 6,
        position: 'relative',
    },
    title: {
        fontSize: theme.typography.size.xl,
        fontWeight: theme.typography.weight.bold,
        color: theme.colors.text.dark,
    },
    price: {
        fontSize: theme.typography.size['2xl'],
        fontWeight: theme.typography.weight.extrabold,
        marginTop: theme.spacing[2],
        color: theme.colors.text.dark,
    },
    sectionTitle: {
        marginTop: theme.spacing[4],
        marginBottom: theme.spacing[2],
        fontWeight: theme.typography.weight.bold,
        fontSize: theme.typography.size.lg,
        lineHeight: theme.typography.lineHeight.lg,
        color: theme.colors.text.dark,
    },
    favoriteButton: {
        position: 'absolute',
        top: 24,
        right: theme.spacing[3],
        width: 44,
        height: 44,
        backgroundColor: theme.colors.background.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteIcon: {
        width: 24,
        height: 24,
        tintColor: theme.colors.border.muted,
    },
    favoriteIconActive: {
        tintColor: theme.colors.feedback.danger,
    },
    featuresRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    featureItem: {
        backgroundColor: theme.colors.background.card,
        padding: theme.spacing[3],
        borderRadius: theme.radius.md,
        width: '48%',
    },
    featureTitle: {
        color: theme.colors.text.muted,
        fontSize: theme.typography.size.xs,
    },
    featureValue: {
        marginTop: 6,
        fontWeight: theme.typography.weight.bold,
        fontSize: theme.typography.size.base,
        lineHeight: theme.typography.lineHeight.sm,
        color: theme.colors.text.dark,
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.radius.xl,
        padding: theme.spacing[3],
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing[3],
        ...theme.shadow.xs,
    },
    featureIconWrap: {
        width: 44,
        height: 44,
        borderRadius: theme.radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background.brandSubtle,
    },
    featureIconEmoji: {
        width: 24,
        height: 24,
        tintColor: theme.colors.brand.primary,
    },
    featureText: {
        marginLeft: theme.spacing[3],
    },
    featureSmallTitle: {
        color: theme.colors.text.muted,
        fontSize: theme.typography.size.xs,
    },
    description: {
        color: theme.colors.text.body,
        lineHeight: theme.typography.lineHeight.sm,
    },
    reviewItem: {
        backgroundColor: theme.colors.background.card,
        padding: theme.spacing[3],
        marginHorizontal: theme.spacing[3],
    },
    reviewText: {
        marginTop: 6,
        color: theme.colors.text.body,
    },
    reviewerName: {
        fontWeight: theme.typography.weight.semibold,
        color: theme.colors.text.dark,
    },
    reviewDate: {
        color: theme.colors.text.disabled,
        fontSize: theme.typography.size.xs,
        marginTop: theme.spacing[1],
    },
    header: {
        backgroundColor: theme.colors.background.card,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[4],
    },
    headerButton: {
        width: 32,
        height: 40,
        padding: theme.spacing[2],
    },
    headerIconImage: {
        width: 24,
        height: 24,
        tintColor: theme.colors.text.primary,
    },
    errorText: {
        color: theme.colors.feedback.error,
    },
    reviewEmptyText: {
        color: theme.colors.text.muted,
    },
    reviewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewDivider: {
        height: 1,
        backgroundColor: theme.colors.border.light,
    },
    headerTitle: {
        fontSize: theme.typography.size.lg,
        lineHeight: theme.typography.lineHeight.lg,
        color: theme.colors.text.primary,
        fontWeight: theme.typography.weight.semibold,
    },
    headerIconText: {
        fontSize: 24,
        color: theme.colors.text.primary,
        lineHeight: 24,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    star: {
        fontSize: theme.typography.size.base,
        marginRight: 2,
    },
    reviewCount: {
        color: theme.colors.text.muted,
        marginLeft: 6,
    },
    footer: {
        flexDirection: 'row',
        padding: theme.spacing[3],
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
        backgroundColor: theme.colors.background.card,
    },
    cartBtn: {
        flex: 1,
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.radius.md,
        marginRight: theme.spacing[2],
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing[3],
        borderWidth: 1,
        borderColor: theme.colors.brand.deep,
    },
    cartBtnText: {
        color: theme.colors.brand.deep,
        fontWeight: theme.typography.weight.bold,
    },
    buyBtn: {
        flex: 1,
        backgroundColor: theme.colors.brand.deep,
        borderRadius: theme.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing[3],
    },
    buyBtnText: {
        color: theme.colors.text.navy,
        fontWeight: theme.typography.weight.extrabold,
    },
});

export default {};
