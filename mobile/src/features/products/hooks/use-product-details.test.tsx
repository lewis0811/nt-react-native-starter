import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import rootReducer from '../../../store/root-reducer';
import useProductDetails from './use-product-details';
import productDetailsReducer from '../store/product-details-slice';
import { apiClient } from '../../../services/api/api-client';
import { beforeEach, describe, expect, it } from '@jest/globals';

function createTestStore() {
    return configureStore({ reducer: rootReducer });
}

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

    it('fetches product and reviews when id provided', async () => {
        (apiClient.get as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('/product/5') && !url.includes('review')) {
                return Promise.resolve({ data: { id: 5, name: 'Test Product' } });
            }
            if (url.includes('/product/5/review')) {
                return Promise.resolve({ data: [{ id: 1, comment: 'Great' }] });
            }
            return Promise.reject(new Error('Not Found'));
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

        const { getByTestId, queryByTestId } = render(<TestComp input={5} />, { wrapper });

        await waitFor(() => expect(getByTestId('loading').props.children).toBe('false'));
        expect(queryByTestId('product')).toBeTruthy();
        const reviewsText = queryByTestId('reviews')?.props.children as string | undefined;
        expect(reviewsText).toBeTruthy();
    });

    it('sets product directly when product object with name provided', async () => {
        const productObj = { name: 'Inline Product' } as any;
        const TestComp = ({ input }: any) => {
            const { product, loading } = useProductDetails(input);
            return (
                <>
                    <Text testID="loading">{String(loading)}</Text>
                    {product && <Text testID="product">{JSON.stringify(product)}</Text>}
                </>
            );
        };

        const { getByTestId, queryByTestId } = render(<TestComp input={productObj} />, { wrapper });

        await waitFor(() => expect(getByTestId('loading').props.children).toBe('false'));
        expect(store.getState().productDetails.product).toEqual(productObj);
        expect(queryByTestId('product')?.props.children).toEqual(JSON.stringify(productObj));
        expect(apiClient.get).not.toHaveBeenCalled();
    });

    it('handles API error for product fetch', async () => {
        (apiClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

        const TestComp = ({ input }: any) => {
            const { error, loading } = useProductDetails(input);
            return (
                <>
                    <Text testID="loading">{String(loading)}</Text>
                    {error && <Text testID="error">error</Text>}
                </>
            );
        };

        const { getByTestId, queryByTestId } = render(<TestComp input={99} />, { wrapper });

        await waitFor(() => expect(getByTestId('loading').props.children).toBe('false'));
        expect(queryByTestId('error')).toBeTruthy();
    });
});