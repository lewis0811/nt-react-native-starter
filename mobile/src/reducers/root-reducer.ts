import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from '../slices/api-slice';
import authReducer from '../slices/auth-slice';
import productsReducer from '../slices/products-slice';

const rootReducer = combineReducers({
    api: apiReducer,
    auth: authReducer,
    products: productsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;