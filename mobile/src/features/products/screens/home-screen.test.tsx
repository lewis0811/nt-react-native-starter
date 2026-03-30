import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import useProducts from '../hooks/use-products';
import { HomeScreen } from './home-screen';

jest.mock('../hooks/use-products');

const mockNavigation = { navigate: jest.fn() };

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('shows loading indicator', () => {
        (useProducts as jest.Mock).mockReturnValue({
            products: [],
            loading: true,
            refresh: jest.fn(),
            categories: ['All Items'],
        });
        const { getByTestId } = render(<HomeScreen navigation={mockNavigation as any} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    test('renders categories and can change category', () => {
        (useProducts as jest.Mock).mockReturnValue({
            products: [],
            loading: false,
            refresh: jest.fn(),
            categories: ['All Items', 'Cat1', 'Cat2'],
        });
        const { getByTestId } = render(<HomeScreen navigation={mockNavigation as any} />);
        fireEvent.press(getByTestId('category-chip-Cat1'));
        fireEvent.press(getByTestId('category-chip-Cat2'));
    });

    test('renders product list and can press product', () => {
        const products = [
            { id: 1, name: 'P1', price: 10, description: 'Cat1', image: null },
            { id: 2, name: 'P2', price: 20, description: 'Cat2', image: null },
        ];
        (useProducts as jest.Mock).mockReturnValue({
            products,
            loading: false,
            refresh: jest.fn(),
            categories: ['All Items', 'Cat1', 'Cat2'],
        });
        const { getByText } = render(<HomeScreen navigation={mockNavigation as any} />);
        fireEvent.press(getByText('P1'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetails', { product: products[0] });
    });

});
