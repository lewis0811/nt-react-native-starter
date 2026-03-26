import React, { memo } from 'react';
import { Pressable, View, Image, Text, StyleSheet } from 'react-native';

interface LogoutActionProps {
    onSignOut: () => void;
}

const LogoutAction: React.FC<LogoutActionProps> = ({ onSignOut }) => (
    <Pressable testID="logout-button" style={styles.actionCard} onPress={onSignOut} accessible={false}>
        <View style={styles.actionLeft}>
            <View style={styles.logoutIconBackground}>
                <Image
                    source={require('../../assets/images/logout_icon.png')}
                    style={styles.logoutIcon}
                    resizeMode="contain"
                    accessibilityRole="image"
                    alt="logout icon"
                />
            </View>
            <Text style={styles.logoutLabel}>Logout</Text>
        </View>
    </Pressable>
);

import { styles } from '../../screens/styles/profile-screen-styles';

export default memo(LogoutAction);