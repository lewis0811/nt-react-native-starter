import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../../assets/styles';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: CARD_MARGIN,
        backgroundColor: theme.colors.background.page,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing[2],
    },
    header: {
        fontSize: 22,
        fontWeight: theme.typography.weight.extrabold,
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: theme.spacing[2],
        backgroundColor: theme.colors.background.card,
        padding: theme.spacing[2],
        borderRadius: theme.radius.md,
    },
    notificationIcon: {
        marginLeft: theme.spacing[2],
        backgroundColor: theme.colors.background.card,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadow.sm,
    },
    cartIcon: {
        marginLeft: theme.spacing[2],
        backgroundColor: theme.colors.background.card,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadow.sm,
    },
    iconImage: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },
    searchWrap: {
        marginTop: theme.spacing[2],
    },
    categoriesWrap: {
        marginTop: theme.spacing[2],
        paddingVertical: 6,
    },
    chip: {
        paddingVertical: theme.spacing[2],
        paddingHorizontal: 14,
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.radius['2xl'],
        marginRight: theme.spacing[2],
        ...theme.shadow.xs,
    },
    chipActive: {
        backgroundColor: theme.colors.brand.deep,
    },
    chipText: {
        color: theme.colors.text.body,
    },
    chipTextActive: {
        color: theme.colors.text.navy,
    },
    list: {
        paddingVertical: theme.spacing[2],
        paddingBottom: theme.spacing[10],
    },
    card: {
        backgroundColor: theme.colors.background.card,
        borderRadius: theme.radius.xl,
        width: CARD_WIDTH,
        marginBottom: theme.spacing[4],
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 160,
        backgroundColor: theme.colors.background.surface,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    heart: {
        position: 'absolute',
        right: theme.spacing[2],
        top: theme.spacing[2],
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartText: {
        fontSize: theme.typography.size.md,
    },
    info: {
        padding: 10,
    },
    title: {
        fontWeight: theme.typography.weight.medium,
        fontSize: theme.typography.size.base,
        lineHeight: theme.typography.lineHeight.sm,
        color: theme.colors.text.dark,
    },
    category: {
        fontSize: theme.typography.size.xs,
        color: theme.colors.text.muted,
        paddingBottom: theme.spacing[1],
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: theme.typography.size.md,
        fontWeight: theme.typography.weight.bold,
        color: theme.colors.text.dark,
    },
    addButton: {
        backgroundColor: theme.colors.brand.deep,
        width: 32,
        height: 32,
        borderRadius: theme.radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontSize: 20,
        fontWeight: theme.typography.weight.bold,
        color: theme.palette.black,
    },
    loadingIndicator: {
        marginTop: theme.spacing[5],
    },
    errorContainer: {
        padding: theme.spacing[4],
        alignItems: 'center',
    },
    errorInner: {
        alignItems: 'center',
    },
    errorText: {
        color: theme.colors.feedback.error,
        marginBottom: theme.spacing[2],
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
});

export default {};
