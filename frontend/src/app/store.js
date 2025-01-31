import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productListReducer from '../features/product-list/productListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    productList: productListReducer,
  },
});