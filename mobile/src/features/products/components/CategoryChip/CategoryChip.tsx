import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
    label: string;
    active?: boolean;
    onPress?: () => void;
    testID?: string;
    style?: any;
    activeStyle?: any;
    textStyle?: any;
    activeTextStyle?: any;
};

const CategoryChip: React.FC<Props> = ({ label, active = false, onPress, testID, style, activeStyle, textStyle, activeTextStyle }) => (
    <TouchableOpacity onPress={onPress} style={[style, active && activeStyle]} testID={testID}>
        <Text style={[textStyle, active && activeTextStyle]}>{label}</Text>
    </TouchableOpacity>
);

export default CategoryChip;
