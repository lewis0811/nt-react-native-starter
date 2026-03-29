import { StyleSheet, TextStyle, ViewStyle, ImageStyle, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#F8FAFB',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconBtn: {
        marginLeft: 8,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
    },
    notificationIcon: {
        marginLeft: 8,
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    cartIcon: {
        marginLeft: 8,
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    iconImage: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },
    searchWrap: {
        marginTop: 8,
    },
    categoriesWrap: {
        marginTop: 8,
        paddingVertical: 6,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginRight: 8,
    },
    chipActive: {
        backgroundColor: '#00E6DA',
    },
    chipText: {
        color: '#333',
    },
    chipTextActive: {
        color: '#003',
    },
    list: {
        paddingVertical: 8,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: CARD_WIDTH,
        marginBottom: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 160,
        backgroundColor: '#eee',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    heart: {
        position: 'absolute',
        right: 8,
        top: 8,
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartText: {
        fontSize: 16,
    },
    info: {
        padding: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        color: '#111827',
    },
    category: {
        fontSize: 12,
        color: '#8b8b8b',
        paddingBottom: 4,
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    addButton: {
        backgroundColor: '#00E6DA',
        width: 32,
        height: 32,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
});

export default {};
