import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import LoadingScreen from '../LoadingScreen';
import { theme } from '../../assets/styles';

export default function Button({ style, title, children, loading = false, disabled = false, textStyle, ...props }: any) {
    const isDisabled = Boolean(disabled || loading || props.disabled);

    return (
        <TouchableOpacity
            style={[styles.button, style, isDisabled && styles.disabled]}
            activeOpacity={0.8}
            disabled={isDisabled}
            {...props}
        >
            {loading ? (
                <LoadingScreen testID="button-loading-indicator" size="small" color={styles.text.color as any} />
            ) : children ? (
                typeof children === 'string' || typeof children === 'number' ? (
                    <Text style={[styles.text, textStyle]}>{children}</Text>
                ) : (
                    children
                )
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

type IButtonStyles = {
    button: ViewStyle;
    text: TextStyle;
    disabled: ViewStyle;
};

const styles = StyleSheet.create<IButtonStyles>({
    button: {
        width: '100%',
        marginVertical: theme.spacing[2] + 2,
        paddingVertical: 10,
        backgroundColor: theme.colors.brand.primary,
        alignItems: 'center',
        borderRadius: theme.radius.lg,
    },
    text: {
        fontWeight: theme.typography.weight.bold,
        fontSize: theme.typography.size.md - 1,
        lineHeight: 26,
        color: theme.palette.black,
    },
    disabled: {
        opacity: 0.6,
    },
});
