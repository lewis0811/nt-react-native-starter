import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from '../../navigation/styles/main-navigator-styles';

type LoadingScreenProps = {
    testID?: string;
    size?: number | 'small' | 'large';
    color?: string;
    inline?: boolean;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    testID = 'loading-indicator',
    size = 'large',
    color,
    inline = false,
}) => {
    if (inline) {
        return <ActivityIndicator testID={testID} size={size as any} color={color} />;
    }

    return (
        <View style={styles.centeredContainer}>
            <ActivityIndicator testID={testID} size={size as any} color={color} />
        </View>
    );
};

export default LoadingScreen;
