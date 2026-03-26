import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { fetchProductById, fetchProductReviews, setProduct, toggleFavorite } from '../slices/product-details-slice';

export default function useProductDetails(productParam?: any) {
    const dispatch = useAppDispatch();
    const state = useAppSelector((s) => s.productDetails);

    useEffect(() => {
        const id = productParam?.id ?? productParam;
        if (!id && productParam && productParam.id === undefined && productParam.name) {
            // product object passed; set it but don't fetch
            dispatch(setProduct(productParam));
            return;
        }
        if (id) {
            void dispatch(fetchProductById(Number(id)));
            void dispatch(fetchProductReviews(Number(id)));
        }
    }, [dispatch, productParam]);

    const onToggleFavorite = (id?: number) => {
        const pid = id ?? state.product?.id;
        if (!pid) return;
        dispatch(toggleFavorite(pid));
    };

    return {
        product: state.product,
        reviews: state.reviews,
        loading: state.loading,
        error: state.error,
        isFavorite: state.product ? !!state.favorites[String(state.product.id)] : false,
        fetchProductById: (id: number) => dispatch(fetchProductById(id)),
        fetchProductReviews: (id: number) => dispatch(fetchProductReviews(id)),
        toggleFavorite: onToggleFavorite,
    };
}
