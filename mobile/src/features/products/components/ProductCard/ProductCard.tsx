import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Product } from '../../types';
import { styles } from '../../screens/styles/home-screen-styles';

interface ProductCardProps {
    product: Product;
    onPress: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onPress }) => {
    const price = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(product)}
            testID="product-card"
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image || 'https://via.placeholder.com/300' }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <TouchableOpacity style={styles.heart} testID="favorite-button">
                    <Text style={styles.heartText}>♡</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.category} numberOfLines={1}>{product.description ?? product.priceUnit ?? 'Category'}</Text>
                <View style={styles.rowBetween}>
                    <Text style={styles.price}>{price}</Text>
                    <TouchableOpacity style={styles.addButton} testID="add-to-cart-button">
                        <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
});

export default ProductCard;
