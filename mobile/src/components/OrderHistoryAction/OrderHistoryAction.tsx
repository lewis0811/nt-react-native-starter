import React, { memo } from 'react';
import { Pressable, View, Image, Text, StyleSheet } from 'react-native';

const OrderHistoryAction: React.FC = () => (
    <Pressable testID="order-history-button" style={styles.actionCard} accessible={false}>
        <View style={styles.actionLeft}>
            <View style={styles.orderIconBackground}>
                <Image
                    source={require('../../assets/images/lock_icon.png')}
                    style={styles.orderIcon}
                    resizeMode="contain"
                    accessibilityRole="image"
                    alt="lock icon"
                />
            </View>
            <Text style={styles.actionLabel}>Order History</Text>
        </View>
        <Image
            source={require('../../assets/images/chevron_icon.png')}
            style={styles.chevronIcon}
            resizeMode="contain"
            accessibilityRole="image"
            alt="chevron icon"
        />
    </Pressable>
);

import { styles } from '../../screens/styles/profile-screen-styles';

export default memo(OrderHistoryAction);