import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFB',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hero: {
        width: '100%',
        height: 320,
        backgroundColor: '#eee',
    },
    card: {
        padding: 16,
    },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginTop: 12,
    },
    badge: {
        color: '#06C3B0',
        fontWeight: '700',
        marginBottom: 6,
        position: 'relative',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    price: {
        fontSize: 22,
        fontWeight: '800',
        marginTop: 8,
        color: '#111827',
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 28,
        color: '#111827',
    },
    favoriteButton: {
        position: 'absolute',
        top: 24,
        right: 12,
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoriteIcon: {
        width: 24,
        height: 24,
        tintColor: '#9CA3AF',
    },
    favoriteIconActive: {
        tintColor: '#FF3B30',
    },
    featuresRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    featureItem: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        width: '48%',
    },

    featureTitle: {
        color: '#6b7280',
        fontSize: 12,
    },
    featureValue: {
        marginTop: 6,
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 20,
        color: '#111827',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000000',
        shadowOpacity: 0.015,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    featureIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6FEF9',
    },
    featureIconEmoji: {
        width: 24,
        height: 24,
        tintColor: '#0DF2F2',
    },
    featureText: {
        marginLeft: 12,
    },
    featureSmallTitle: {
        color: '#6b7280',
        fontSize: 12,
    },
    description: {
        color: '#374151',
        lineHeight: 20,
    },
    reviewItem: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        marginHorizontal: 12,
    },
    reviewText: {
        marginTop: 6,
        color: '#374151',
    },
    reviewerName: {
        fontWeight: '600',
        color: '#111827',
    },
    reviewDate: {
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 4,
    },
    header: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    headerButton: {
        width: 32,
        height: 40,
        padding: 8,
    },
    headerIconImage: {
        width: 24,
        height: 24,
        tintColor: '#0F172A',
    },
    errorText: {
        color: '#a00',
    },
    reviewEmptyText: {
        color: '#6b7280',
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
        backgroundColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 18,
        lineHeight: 28,
        color: '#0F172A',
        fontWeight: '600',
    },
    headerIconText: {
        fontSize: 24,
        color: '#0F172A',
        lineHeight: 24,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    star: {
        fontSize: 14,
        marginRight: 2,
    },
    reviewCount: {
        color: '#6b7280',
        marginLeft: 6,
    },
    footer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },
    cartBtn: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#00E6DA',
    },
    cartBtnText: {
        color: '#00E6DA',
        fontWeight: '700',
    },
    buyBtn: {
        flex: 1,
        backgroundColor: '#00E6DA',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    buyBtnText: {
        color: '#003',
        fontWeight: '800',
    },
});

export default {};
