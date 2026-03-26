import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import useAuth from '../hooks/use-auth';
import useProducts from '../hooks/use-products';
import ProductCard from './components/ProductCard';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Product } from '../types/product';

type RootStackParamList = {
    ProductDetails: { product: Product };
};

interface HomeScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [activeCategory, setActiveCategory] = useState('All Items');
    const { signOut } = useAuth();
    const { products, loading, refresh, error, categories } = useProducts(activeCategory);

    useEffect(() => {
        if (categories && categories.length > 0 && !categories.includes(activeCategory)) {
            setActiveCategory(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        if (!error) return;
        const errObj = error as { status?: number; response?: { status?: number } };
        const status = errObj?.status ?? errObj?.response?.status;
        if (status === 401 || status === 403) {
            void signOut();
        }
    }, [error, navigation, signOut]);

    const handleProductPress = useCallback((product: Product) => {
        navigation.navigate('ProductDetails', { product });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Discover</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn} testID="notification-button">
                        <View style={styles.notificationIcon}>
                            <Image
                                source={require('../assets/images/notification_icon.png')}
                                style={[styles.iconImage, { tintColor: '#0F172A' }]}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} testID="cart-button">
                        <View style={styles.cartIcon}>
                            <Image
                                source={require('../assets/images/cart_icon.png')}
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((c) => (
                        <TouchableOpacity
                            key={c}
                            onPress={() => setActiveCategory(c)}
                            style={[styles.chip, activeCategory === c && styles.chipActive]}
                            testID={`category-chip-${c}`}
                        >
                            <Text style={[styles.chipText, activeCategory === c && styles.chipTextActive]}>{c}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} testID="loading-indicator" />
            ) : error ? (
                <View style={{ padding: 16, alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#a00', marginBottom: 8 }}>Can't load products.</Text>
                        <Button onPress={() => { void refresh(); }} testID="retry-button">Try again</Button>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(i: Product) => String(i.id)}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={handleProductPress}
                        />
                    )}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    onRefresh={refresh}
                    refreshing={loading}
                />
            )}
        </View>
    );
};

import { styles } from './styles/home-screen-styles';

export { HomeScreen };