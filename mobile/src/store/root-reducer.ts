import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from '../services/api/api-slice';
import authReducer from '../features/auth/store/auth-slice';
import productsReducer from '../features/products/store/products-slice';
import productDetailsReducer from '../features/products/store/product-details-slice';

const rootReducer = combineReducers({
    api: apiReducer,
    auth: authReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;