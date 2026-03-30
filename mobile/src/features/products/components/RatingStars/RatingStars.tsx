import React from 'react';
import { View, Text } from 'react-native';
import { styles as screenStyles } from '../../screens/styles/product-details-styles';
import { theme } from '../../../../assets/styles';

interface Props {
    average: number;
    count?: number;
}

const RatingStars: React.FC<Props> = React.memo(({ average, count = 0 }) => {
    const full = Math.floor(average);
    return (
        <View style={screenStyles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Text key={i} style={[screenStyles.star, { color: i < full ? theme.colors.feedback.star : theme.colors.feedback.starEmpty }]}>
                    {i < full ? '★' : '☆'}
                </Text>
            ))}
            <Text style={screenStyles.reviewCount}>{` (${count} Reviews)`}</Text>
        </View>
    );
});

export default RatingStars;
