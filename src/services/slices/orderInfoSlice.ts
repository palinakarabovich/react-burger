import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../types';

type TOrderInfoSlice = {
  order: any | null;
}

export const initialState: TOrderInfoSlice = {
  order: null
}

const orderInfoSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      return {
        order: action.payload,
      }
    },
    removeOrder: () => {
      return {
        order: null,
      }
    }
  }
});

export default orderInfoSlice.reducer
export const { addOrder, removeOrder } = orderInfoSlice.actions
