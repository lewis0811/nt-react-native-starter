import { StyleSheet } from 'react-native';

export const stackScreenOptions = {
    headerShown: false,
} as const;

export const appStyles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
