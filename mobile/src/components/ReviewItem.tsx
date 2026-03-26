import React from 'react';
import { View, Text } from 'react-native';
import { styles as screenStyles } from '../screens/styles/product-details-styles';

interface Review {
    id?: string | number;
    userId?: string | number;
    rating?: number;
    createdAt?: string | number | Date;
    message?: string;
}

interface Props {
    review: Review;
}

const ReviewItem: React.FC<Props> = React.memo(({ review }) => {
    const rating = review.rating || 0;
    return (
        <View style={screenStyles.reviewItem}>
            <View style={screenStyles.reviewRow}>
                <Text style={screenStyles.reviewerName}>{`User ${review.userId ?? 'Anonymous'}`}</Text>
                <View style={screenStyles.reviewRowRight}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Text key={i} style={[screenStyles.star, { color: i < rating ? '#FFB020' : '#CBD5E1' }]}>
                            {i < rating ? '★' : '☆'}
                        </Text>
                    ))}
                </View>
            </View>
            <Text style={screenStyles.reviewDate}>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</Text>
            <Text style={screenStyles.reviewText}>{review.message}</Text>
        </View>
    );
});

export default ReviewItem;
