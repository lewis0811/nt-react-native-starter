import React from 'react';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.mock('../src/hooks/use-product-details');
import useProductDetails from '../src/hooks/use-product-details';

import { ProductDetailsScreen } from '../src/screens/product-details-screen';

describe('ProductDetailsScreen render & interactions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(Alert, 'alert').mockImplementation(() => { });
    });

    test('shows error and retry calls fetchProductById with pid from route', () => {
        const fetchProductById = jest.fn();
        (useProductDetails as jest.Mock).mockReturnValue({
            product: undefined,
            reviews: [],
            loading: false,
            error: 'Network error',
            fetchProductById,
            fetchProductReviews: jest.fn(),
        });

        const route: any = { params: { product: { id: 5 } } };
        const navigation: any = {};

        const { getByText } = render(<ProductDetailsScreen route={route} navigation={navigation} />);

        expect(getByText('Network error')).toBeTruthy();

        const tryAgain = getByText('Try again');
        fireEvent.press(tryAgain);

        expect(fetchProductById).toHaveBeenCalledWith(5);
    });

    test('renders product details when product provided', () => {
        const product = { id: 10, name: 'Test Product', price: 12.5, description: 'Nice product', image: null };
        (useProductDetails as jest.Mock).mockReturnValue({
            product,
            reviews: [],
            loading: false,
            error: undefined,
            fetchProductById: jest.fn(),
            fetchProductReviews: jest.fn(),
        });

        const route: any = { params: { product } };
        const navigation: any = { goBack: jest.fn() };

        const { getByText, getByRole } = render(<ProductDetailsScreen route={route} navigation={navigation} />);

        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('$12.50')).toBeTruthy();
    });

    test('shows loading indicator when loading', () => {
        (useProductDetails as jest.Mock).mockReturnValue({
            product: undefined,
            reviews: [],
            loading: true,
            error: undefined,
            fetchProductById: jest.fn(),
            fetchProductReviews: jest.fn(),
        });

        const route: any = { params: {} };
        const navigation: any = {};

        const { getByTestId } = render(<ProductDetailsScreen route={route} navigation={navigation} />);
        expect(getByTestId('loading-indicator')).toBeTruthy();
    });

    test('renders reviews list', () => {
        const product = { id: 11, name: 'P', price: 1, description: '', image: null };
        const reviews = [{ id: 1, userId: 'u1', rating: 4, message: 'Great product' }];
        (useProductDetails as jest.Mock).mockReturnValue({
            product,
            reviews,
            loading: false,
            error: undefined,
            fetchProductById: jest.fn(),
            fetchProductReviews: jest.fn(),
        });

        const route: any = { params: { product } };
        const navigation: any = {};

        const { getByText } = render(<ProductDetailsScreen route={route} navigation={navigation} />);
        expect(getByText('Great product')).toBeTruthy();
    });

    test('header back and share buttons work; footer buttons trigger alerts', () => {
        const product = { id: 12, name: 'P2', price: 2, description: '', image: null };
        const fetchProductById = jest.fn();
        (useProductDetails as jest.Mock).mockReturnValue({
            product,
            reviews: [],
            loading: false,
            error: undefined,
            fetchProductById,
            fetchProductReviews: jest.fn(),
        });

        const route: any = { params: { product } };
        const navigation: any = { goBack: jest.fn() };

        const { getByTestId } = render(<ProductDetailsScreen route={route} navigation={navigation} />);

        // back button
        fireEvent.press(getByTestId('back-button'));
        expect(navigation.goBack).toHaveBeenCalled();

        // share button
        fireEvent.press(getByTestId('share-button'));
        expect(Alert.alert).toHaveBeenCalledWith('Share', 'Share product');

        // favorite exists and can be pressed without crashing
        expect(getByTestId('favorite-button')).toBeTruthy();
        fireEvent.press(getByTestId('favorite-button'));

        // footer buttons -> alerts
        fireEvent.press(getByTestId('add-to-cart-button'));
        expect(Alert.alert).toHaveBeenCalledWith('Added', 'Added to cart');

        fireEvent.press(getByTestId('buy-now-button'));
        expect(Alert.alert).toHaveBeenCalledWith('Buy', 'Proceed to buy');
    });
});
