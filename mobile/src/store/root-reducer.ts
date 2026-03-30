import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/auth-slice';
import productsReducer from '../features/products/store/products-slice';
import productDetailsReducer from '../features/products/store/product-details-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    productDetails: productDetailsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;