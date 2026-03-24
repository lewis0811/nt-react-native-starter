import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

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
                <ActivityIndicator color={styles.text.color as any} />
            ) : children ? (
                children
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
        marginVertical: 10,
        paddingVertical: 10,
        backgroundColor: '#39B78D',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
        color: 'black',
    },
    disabled: {
        opacity: 0.6,
    },
});
