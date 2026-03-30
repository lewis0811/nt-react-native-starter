import { StyleSheet, ImageStyle } from "react-native";
import { theme } from '../../assets/styles';

export const tabScreenOptions = {
    headerShown: false,
    tabBarActiveTintColor: theme.colors.brand.primary,
    tabBarInactiveTintColor: theme.colors.text.muted,
} as const;

export const stackScreenOptions = {
    headerShown: false,
} as const;

export const styles = StyleSheet.create({
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const tabIconStyle = (size: number, color: string): ImageStyle => ({
    width: size,
    height: size,
    tintColor: color,
});