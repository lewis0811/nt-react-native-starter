import React from 'react';
import { View, Text, TextInput as Input, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { theme } from '../../assets/styles';

export default function TextInput({ errorText, description, ...props }: any) {
    return (
        <View style={styles.container}>
            <Input style={styles.input} underlineColor="transparent" {...props} />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
}

type ITexInputStyles = {
    container: ViewStyle;
    input: ViewStyle;
    description: TextStyle
    error: TextStyle;
};

const styles = StyleSheet.create<ITexInputStyles>({
    container: {
        width: '100%',
        marginVertical: theme.spacing[3],
    },
    input: {
        backgroundColor: theme.colors.background.card,
        borderColor: theme.colors.text.muted,
        paddingVertical: 10,
        paddingHorizontal: theme.spacing[4],
        borderRadius: theme.radius.lg,
    },
    description: {
        fontSize: theme.typography.size.sm,
        color: theme.colors.text.muted,
        paddingTop: theme.spacing[2],
    },
    error: {
        fontSize: theme.typography.size.sm,
        color: theme.colors.text.muted,
        paddingTop: theme.spacing[2],
    },
});
