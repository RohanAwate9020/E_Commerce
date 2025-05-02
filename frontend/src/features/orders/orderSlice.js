import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders } from './orderAPI';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'orders/fetchAllOrders',
  async (pagination) => {
    console.log("Pagination",pagination);
    const response = await fetchAllOrders(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder =null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
        state.totalOrders=action.payload.totalOrders;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

 export const selectCurrentOrder = (state) => state.order.currentOrder;
 export const selectOrders = (state) => state.order.orders;
 export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;