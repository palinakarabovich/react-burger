import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {},
    orderRequest: false,
    orderSuccess: false,
    orderError: false,
    orderModalOpen: false,
  },
  reducers: {
    orderRequest: (state, action) => {
      return {
        orderRequest: true,
        orderSuccess: false,
        orderError: false,
        orderModalOpen: true,
      }
    },
    orderSuccess: (state, action) => {
      return {
        order: action.payload,
        orderRequest: false,
        orderSuccess: true,
        orderError: false,
        orderModalOpen: true,
      }
    },
    orderFail: (state, action) => {
      return {
        orderRequest: false,
        orderSuccess: false,
        orderError: true,
        orderModalOpen: false,
      }
    },
    cleanOrder: (state, action) => {
      return {
        order: {},
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