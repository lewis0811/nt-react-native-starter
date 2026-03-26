import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import useAuth from '../hooks/use-auth';
import useProducts from '../hooks/use-products';

interface HomeScreenProps {
    navigation: any;
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
        const errObj = error as any;
        const status = errObj?.status ?? errObj?.response?.status;

        if (status === 401 || status === 403) {
            void signOut();
        }
    }, [error, navigation, signOut]);

    const renderProduct = ({ item }: any) => {
        const price = typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price;
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image || 'https://via.placeholder.com/300' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.heart}>
                        <Text style={styles.heartText}>♡</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.category} numberOfLines={1}>{item.description ?? item.priceUnit ?? 'Category'}</Text>
                    <View style={styles.rowBetween}>
                        <Text style={styles.price}>{price}</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Discover</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <View style={styles.notificationIcon}>
                            <Image
                                source={require('../assets/images/notification_icon.png')}
                                style={[styles.iconImage, { tintColor: '#0F172A' }]}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
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
                        >
                            <Text style={[styles.chipText, activeCategory === c && styles.chipTextActive]}>{c}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : error ? (
                <View style={{ padding: 16, alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#a00', marginBottom: 8 }}>Can't load products.</Text>
                        <Button onPress={() => { void refresh(); }}>Try again</Button>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(i: any) => String(i.id)}
                    renderItem={renderProduct}
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