import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import useProducts from '../src/hooks/use-products';
import useAuth from '../src/hooks/use-auth';
import { HomeScreen } from '../src/screens/home-screen';

jest.mock('../src/hooks/use-products');
jest.mock('../src/hooks/use-auth');

const mockNavigation = { navigate: jest.fn() };

describe('HomeScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('shows loading indicator', () => {
        (useProducts as jest.Mock).mockReturnValue({
            products: [],
            loading: true,
            error: undefined,
            refresh: jest.fn(),
            categories: ['All Items'],
        });
        (useAuth as jest.Mock).mockReturnValue({ signOut: jest.fn() });
        const { getByTestId } = render(<HomeScreen navigation={mockNavigation as any} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    test('shows error and retry works', () => {
        const refresh = jest.fn();
        (useProducts as jest.Mock).mockReturnValue({
            products: [],
            loading: false,
            error: 'Network error',
            refresh,
            categories: ['All Items'],
        });
        (useAuth as jest.Mock).mockReturnValue({ signOut: jest.fn() });
        const { getByText, getByTestId } = render(<HomeScreen navigation={mockNavigation as any} />);
        expect(getByText("Can't load products.")).toBeTruthy();
        fireEvent.press(getByTestId('retry-button'));
        expect(refresh).toHaveBeenCalled();
    });

    test('renders categories and can change category', () => {
        (useProducts as jest.Mock).mockReturnValue({
            products: [],
            loading: false,
            error: undefined,
            refresh: jest.fn(),
            categories: ['All Items', 'Cat1', 'Cat2'],
        });
        (useAuth as jest.Mock).mockReturnValue({ signOut: jest.fn() });
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
            error: undefined,
            refresh: jest.fn(),
            categories: ['All Items', 'Cat1', 'Cat2'],
        });
        (useAuth as jest.Mock).mockReturnValue({ signOut: jest.fn() });
        const { getByText } = render(<HomeScreen navigation={mockNavigation as any} />);
        fireEvent.press(getByText('P1'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetails', { product: products[0] });
    });

    test('signs out on 401/403 error', () => {
        const signOut = jest.fn();
        (useProducts as jest.Mock).mockReturnValue({
            products: [],
            loading: false,
            error: { status: 401 },
            refresh: jest.fn(),
            categories: ['All Items'],
        });
        (useAuth as jest.Mock).mockReturnValue({ signOut });
        render(<HomeScreen navigation={mockNavigation as any} />);
        expect(signOut).toHaveBeenCalled();
    });
});
