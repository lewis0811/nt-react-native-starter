import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/store';
import { fetchProducts, selectProducts, selectProductsLoading, selectProductsError } from '../slices/products-slice';

export default function useProducts(activeCategory?: string) {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const loading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);

    const refresh = useCallback(() => {
        return dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const categories = React.useMemo(() => {
        const set = new Set<string>();
        products.forEach((p) => {
            const desc = (p as any).description;
            if (desc && typeof desc === 'string' && desc.trim().length > 0) {
                set.add(desc.trim());
            }
        });
        return ['All Items', ...Array.from(set)];
    }, [products]);

    const filtered = React.useMemo(() => {
        if (!activeCategory || activeCategory === 'All Items') return products;
        const match = activeCategory.toLowerCase();
        return products.filter((p) => {
            const desc = (p as any).description;
            return typeof desc === 'string' && desc.toLowerCase().includes(match);
        });
    }, [products, activeCategory]);

    return { products: filtered, loading, error, refresh, categories } as const;
}
