import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import useProductDetails from './use-product-details';
import productDetailsReducer from '../store/product-details-slice';
import { apiClient } from '../../../services/api/api-client';
import { beforeEach, describe, expect, it } from '@jest/globals';

// Mock the apiClient
jest.mock('../../../services/api/api-client', () => ({
    apiClient: {
        get: jest.fn(),
    },
}));

describe('useProductDetails (integration using real store + mocked apiClient)', () => {
    let store: any;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                productDetails: productDetailsReducer,
            },
        });
        jest.clearAllMocks();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

    it('uses product data directly and only fetches reviews when full product passed', async () => {
        (apiClient.get as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('/product/5/review')) {
                return Promise.resolve({ data: { data: [{ id: 1, comment: 'Great' }] } });
            }
            return Promise.reject(new Error('Should not fetch product'));
        });

        const TestComp = ({ input }: any) => {
            const { product, reviews, loading } = useProductDetails(input);
            return (
                <>
                    <Text testID="loading">{String(loading)}</Text>
                    {product && <Text testID="product">{JSON.stringify(product)}</Text>}
                    {reviews && <Text testID="reviews">{JSON.stringify(reviews)}</Text>}
                </>
            );
        };

        const { getByTestId, queryByTestId } = render(<TestComp input={{ id: 5, name: 'Test Product' }} />, { wrapper });

        await waitFor(() => expect(queryByTestId('product')).toBeTruthy());
        // Should NOT have called /product/5 (no auth fetch)
        expect(apiClient.get).not.toHaveBeenCalledWith('/product/5');
        expect(apiClient.get).toHaveBeenCalledWith('/product/5/review');
        const reviewsText = queryByTestId('reviews')?.props.children as string | undefined;
        expect(reviewsText).toBeTruthy();
    });

    it('handles API error on retry via fetchProductById', async () => {
        (apiClient.get as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('/product/99/review')) {
                return Promise.resolve({ data: { data: [] } });
            }
            if (url === '/product/99') {
                return Promise.reject({ response: { data: { message: 'Not found' } } });
            }
            return Promise.reject(new Error('unexpected'));
        });

        const TestComp = ({ input }: any) => {
            const { error, loading, fetchProductById: retry } = useProductDetails(input);
            return (
                <>
                    <Text testID="loading">{String(loading)}</Text>
                    {error && <Text testID="error">{error}</Text>}
                    <Text testID="retry" onPress={() => retry(99)} />
                </>
            );
        };

        const { getByTestId, queryByTestId } = render(<TestComp input={{ id: 99, name: 'Unknown' }} />, { wrapper });
        fireEvent.press(getByTestId('retry'));

        await waitFor(() => expect(queryByTestId('error')).toBeTruthy());
    });
});