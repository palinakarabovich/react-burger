import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderSubmitted } from '../../types';

export type TOrderSlice = {
  order: IOrderSubmitted | undefined
  orderRequest: boolean;
  orderSuccess: boolean;
  orderError: boolean;
  orderModalOpen: boolean;
}

const initialState: TOrderSlice = {
  order: undefined,
  orderRequest: false,
  orderSuccess: false,
  orderError: false,
  orderModalOpen: false,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderRequest: () => {
      return {
        order: undefined,
        orderRequest: true,
        orderSuccess: false,
        orderError: false,
        orderModalOpen: true,
      }
    },
    orderSuccess: (state, action: PayloadAction<IOrderSubmitted>) => {
      return {
        order: action.payload,
        orderRequest: false,
        orderSuccess: true,
        orderError: false,
        orderModalOpen: true,
      }
    },
    orderFail: () => {
      return {
        order: undefined,
        orderRequest: false,
        orderSuccess: false,
        orderError: true,
        orderModalOpen: false,
      }
    },
    cleanOrder: () => {
      return {
        order: undefined,
        orderRequest: false,
        orderSuccess: false,
        orderError: false,
        orderModalOpen: false,
      }
    }
  },
});

export default orderSlice.reducer
export const { orderRequest, orderSuccess, orderFail, cleanOrder } = orderSlice.actions