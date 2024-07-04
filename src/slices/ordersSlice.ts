import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '../utils/burger-api';

interface TOrdersState {
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: TOrdersState = {
  currentOrder: null,
  loading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getCurrentOrder: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrderById.pending, (state) => {
        state.loading = true;
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(loadOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось получить информацию о заказе';
      })
      .addCase(loadOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.orders[0];
        state.error = null;
      });
  }
});

export const loadOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: number) => getOrderByNumberApi(id)
);

export const { getCurrentOrder } = ordersSlice.selectors;
