import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchProductById, fetchProductReviews, setProduct } from '../store/product-details-slice';

export default function useProductDetails(productParam?: any) {
    const dispatch = useAppDispatch();
    const state = useAppSelector((s) => s.productDetails);

    useEffect(() => {
        const id = typeof productParam === 'object' ? productParam?.id : productParam;

        if (!id && productParam && productParam.id === undefined && productParam.name) {
            dispatch(setProduct(productParam));
            return;
        }
        if (id) {
            void dispatch(fetchProductById(Number(id)));
            void dispatch(fetchProductReviews(Number(id)));
        }
    }, [dispatch, productParam]);

    return {
        product: state.product,
        reviews: state.reviews,
        loading: state.loading,
        error: state.error,
        fetchProductById: (id: number) => dispatch(fetchProductById(id)),
        fetchProductReviews: (id: number) => dispatch(fetchProductReviews(id)),
        // favorites removed
    };
}