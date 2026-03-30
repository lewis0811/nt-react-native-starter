import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import LoadingScreen from '../../../components/LoadingScreen';
import TextInput from '../../../components/TextInput';
import useProducts from '../hooks/use-products';
import ProductCard from '../components/ProductCard/ProductCard';
import { styles } from './styles/home-screen-styles';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Product } from '../types';
import type { RootStackParamList } from '../../../navigation/types';
import CategoryChip from '../components/CategoryChip';

interface HomeScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState('All Items');
    const { products, loading, refresh, categories } = useProducts(activeCategory);

    useEffect(() => {
        if (categories?.length > 0 && !categories.includes(activeCategory)) {
            setActiveCategory(categories[0]);
        }
    }, [categories, activeCategory]);

    const handleProductPress = useCallback((product: Product) => {
        navigation.navigate('ProductDetails', { product });
    }, [navigation]);

    const renderCategory = useCallback(({ item: c }: { item: string }) => (
        <CategoryChip
            label={c}
            onPress={() => setActiveCategory(c)}
            active={activeCategory === c}
            testID={`category-chip-${c}`}
            style={styles.chip}
            activeStyle={styles.chipActive}
            textStyle={styles.chipText}
            activeTextStyle={styles.chipTextActive}
        />
    ), [activeCategory]);

    const renderProduct = useCallback(({ item }: { item: Product }) => (
        <ProductCard
            product={item}
            onPress={handleProductPress}
        />
    ), [handleProductPress]);

    const keyExtractor = useCallback((item: Product) => String(item.id), []);
    const categoryKeyExtractor = useCallback((item: string) => item, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Discover</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn} testID="notification-button">
                        <View style={styles.notificationIcon}>
                            <Image
                                source={require('../../../assets/images/notification_icon.png')}
                                style={[styles.iconImage, { tintColor: '#0F172A' }]}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} testID="cart-button">
                        <View style={styles.cartIcon}>
                            <Image
                                source={require('../../../assets/images/cart_icon.png')}
                                style={[styles.iconImage, { tintColor: '#0F172A' }]}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchWrap}>
                <TextInput placeholder="Search products, brands..." />
            </View>

            <View style={styles.categoriesWrap}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    keyExtractor={categoryKeyExtractor}
                    renderItem={renderCategory}
                    extraData={activeCategory}
                />
            </View>

            {loading && (!products || products.length === 0) ? (
                <LoadingScreen testID="loading-indicator" />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={keyExtractor}
                    renderItem={renderProduct}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    columnWrapperStyle={styles.columnWrapper}
                    onRefresh={refresh}
                    refreshing={loading}
                />
            )}
        </View>
    );
};

export { HomeScreen };