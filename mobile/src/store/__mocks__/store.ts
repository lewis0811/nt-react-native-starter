import { jest } from '@jest/globals';

let _state: any = { productDetails: { product: undefined, reviews: [], loading: false, error: undefined, favorites: {} } };
export const mockDispatch = jest.fn();

export const useAppDispatch = () => mockDispatch;

export const useAppSelector = (selector: any) => selector(_state);

export const setMockState = (s: any) => { _state.productDetails = s; };

export default { useAppDispatch, useAppSelector, mockDispatch, setMockState };
