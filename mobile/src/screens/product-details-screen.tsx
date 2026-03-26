import React, { useCallback } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Alert, FlatList } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Product } from '../types/product';
import Button from '../components/Button';
import { styles } from './styles/product-details-styles';
import useProductDetails from '../hooks/use-product-details';
import ReviewItem from '../components/ReviewItem';
import RatingStars from '../components/RatingStars';

type RootStackParamList = {
    ProductDetails: {
        product?: Product;
    } | undefined;
};

type ProductDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

interface Props {
    route?: ProductDetailsRouteProp;
    navigation?: ProductDetailsNavigationProp;
}

export const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
    const initial = route?.params?.product;
    const pid = initial?.id ?? undefined;
    const { product, reviews, loading, error, isFavorite, toggleFavorite, fetchProductById } = useProductDetails(initial ?? pid);

    const handleRetry = useCallback(() => {
        const idToFetch = product?.id ?? pid;
        if (idToFetch) {
            void fetchProductById(Number(idToFetch));
        } else {
            Alert.alert('Error', 'Product id is not available to retry');
        }
    }, [product?.id, pid, fetchProductById]);

    const handleGoBack = useCallback(() => navigation?.goBack?.(), [navigation]);
    const handleShare = useCallback(() => Alert.alert('Share', 'Share product'), []);
    const handleToggleFavorite = useCallback(() => toggleFavorite(product?.id), [toggleFavorite, product?.id]);
    const handleAddToCart = useCallback(() => Alert.alert('Added', 'Added to cart'), []);
    const handleBuyNow = useCallback(() => Alert.alert('Buy', 'Proceed to buy'), []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <Button onPress={handleRetry}>Try again</Button>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>No product.</Text>
            </View>
        );
    }

    const price = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : (product.price ?? '—');
    const reviewCount = reviews.length;
    const averageRating = reviewCount > 0 ? Math.round((reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviewCount) * 10) / 10 : 0;


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
                    <Image
                        source={require('../assets/images/arrow_back.png')}
                        style={styles.headerIconImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Product Details</Text>

                <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
                    <Image
                        source={require('../assets/images/share_icon.png')}
                        style={styles.headerIconImage}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={reviews}
                keyExtractor={(item, index) => String(item.id ?? `${item.userId ?? 'anon'}-${item.createdAt ?? index}`)}
                renderItem={({ item }) => <ReviewItem review={item} />}
                ListHeaderComponent={() => (
                    <>
                        <Image source={{ uri: product.image ?? 'https://via.placeholder.com/600' }} style={styles.hero} />

                        <View style={styles.sectionCard}>
                            <Text style={styles.badge}>NEW ARRIVAL</Text>
                            <Text style={styles.title}>{product?.name}</Text>
                            <RatingStars average={averageRating} count={reviewCount} />
                            <Text style={styles.price}>{price}</Text>
                            <TouchableOpacity style={styles.favoriteButton} onPress={handleToggleFavorite}>
                                <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Key Features</Text>
                            <View style={styles.featuresGrid}>
                                <View style={styles.featureCard}>
                                    <View style={styles.featureIconWrap}>
                                        <Image
                                            source={require('../assets/images/battery_icon.png')}
                                            style={styles.featureIconEmoji}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={styles.featureSmallTitle}>Battery</Text>
                                        <Text style={styles.featureValue}>48 Hours</Text>
                                    </View>
                                </View>

                                <View style={styles.featureCard}>
                                    <View style={styles.featureIconWrap}>
                                        <Image
                                            source={require('../assets/images/sync_icon.png')}
                                            style={styles.featureIconEmoji}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={styles.featureSmallTitle}>Sync</Text>
                                        <Text style={styles.featureValue}>Bluetooth 5.2</Text>
                                    </View>
                                </View>

                                <View style={styles.featureCard}>
                                    <View style={styles.featureIconWrap}>
                                        <Image
                                            source={require('../assets/images/water_icon.png')}
                                            style={styles.featureIconEmoji}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={styles.featureSmallTitle}>Water</Text>
                                        <Text style={styles.featureValue}>5ATM Resist</Text>
                                    </View>
                                </View>

                                <View style={styles.featureCard}>
                                    <View style={styles.featureIconWrap}>
                                        <Image
                                            source={require('../assets/images/warranty_icon.png')}
                                            style={styles.featureIconEmoji}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <View style={styles.featureText}>
                                        <Text style={styles.featureSmallTitle}>Warranty</Text>
                                        <Text style={styles.featureValue}>12 Months</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Product Description</Text>
                            <Text style={styles.description}>{product.description ?? 'No description provided.'}</Text>
                        </View>

                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>User Reviews</Text>
                        </View>
                    </>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.sectionCard}>
                        <Text style={styles.reviewEmptyText}>No reviews yet.</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 120 }}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
                    <Text style={styles.cartBtnText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
                    <Text style={styles.buyBtnText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};