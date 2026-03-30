import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchProducts, selectProducts, selectProductsLoading } from '../store/products-slice';

export interface Product {
    description?: string;
    [key: string]: unknown;
}

export default function useProducts(activeCategory?: string) {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const loading = useAppSelector(selectProductsLoading);

    const refresh = useCallback(() => {
        return dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const request = dispatch(fetchProducts());
        return () => {
            if (request.abort) {
                request.abort();
            }
        };
    }, [dispatch]);

    const categories = useMemo(() => {
        const set = new Set<string>();
        for (const p of products) {
            const desc = p.description?.trim();
            if (desc) {
                set.add(desc);
            }
        }
        return ['All Items', ...Array.from(set)];
    }, [products]);

    const filtered = useMemo(() => {
        if (!activeCategory || activeCategory === 'All Items') return products;

        const match = activeCategory.toLowerCase();
        return products.filter((p) => {
            const desc = p.description?.toLowerCase();
            return desc?.includes(match);
        });
    }, [products, activeCategory]);

    return { products: filtered, loading, refresh, categories } as const;
}