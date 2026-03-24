
import { configureStore, Middleware } from '@reduxjs/toolkit';
import rootReducer
, { RootState } from '../reducers/root-reducer';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const m = getDefaultMiddleware();
    return process.env.NODE_ENV !== 'production' ? m.concat(logger as Middleware) : m;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
