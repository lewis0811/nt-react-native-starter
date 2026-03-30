import React from 'react';
import { Image } from 'react-native';
import { render } from '@testing-library/react-native';
import { HomeTabIcon, ProfileTabIcon } from './TabIcons';

jest.mock('../../navigation/styles/main-navigator-styles', () => ({
    tabIconStyle: (size: number, color: string) => ({ width: size, height: size, tintColor: color }),
}));

describe('HomeTabIcon', () => {
    test('renders without crashing', () => {
        const { UNSAFE_getByType } = render(<HomeTabIcon color="#000" size={24} />);
        expect(UNSAFE_getByType(Image)).toBeTruthy();
    });

    test('applies tintColor from color prop', () => {
        const { UNSAFE_getByType } = render(<HomeTabIcon color="#FF0000" size={24} />);
        expect(UNSAFE_getByType(Image).props.style).toMatchObject({ tintColor: '#FF0000' });
    });

    test('applies size from size prop', () => {
        const { UNSAFE_getByType } = render(<HomeTabIcon color="#000" size={32} />);
        expect(UNSAFE_getByType(Image).props.style).toMatchObject({ width: 32, height: 32 });
    });
});

describe('ProfileTabIcon', () => {
    test('renders without crashing', () => {
        const { UNSAFE_getByType } = render(<ProfileTabIcon color="#000" size={24} />);
        expect(UNSAFE_getByType(Image)).toBeTruthy();
    });

    test('applies tintColor from color prop', () => {
        const { UNSAFE_getByType } = render(<ProfileTabIcon color="#0000FF" size={24} />);
        expect(UNSAFE_getByType(Image).props.style).toMatchObject({ tintColor: '#0000FF' });
    });

    test('applies size from size prop', () => {
        const { UNSAFE_getByType } = render(<ProfileTabIcon color="#000" size={20} />);
        expect(UNSAFE_getByType(Image).props.style).toMatchObject({ width: 20, height: 20 });
    });
});
