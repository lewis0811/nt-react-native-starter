import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchProductById, fetchProductReviews, setProduct, resetProductDetails } from '../store/product-details-slice';
import { Product } from '../types';

export default function useProductDetails(productParam?: Product) {
    const dispatch = useAppDispatch();
    const state = useAppSelector((s) => s.productDetails);

    useEffect(() => {
        if (!productParam?.id) return;
        const id = Number(productParam.id);
        if (isNaN(id)) return;

        dispatch(setProduct(productParam));
        void dispatch(fetchProductReviews(id));

        return () => {
            dispatch(resetProductDetails());
        };
    }, [dispatch, productParam]);

    const boundFetchProductById = useCallback((id: number) => {
        return dispatch(fetchProductById(id));
    }, [dispatch]);

    return {
        product: state.product,
        reviews: state.reviews,
        loading: state.loading,
        error: state.error,
        fetchProductById: boundFetchProductById,
    };
}