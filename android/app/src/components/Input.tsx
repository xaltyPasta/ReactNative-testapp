import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
    error?: boolean;
}

export const Input: React.FC<Props> = ({ error, ...props }) => {
    return (
        <TextInput
            style={[styles.input, error && styles.errorInput]}
            placeholderTextColor="#666"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
});