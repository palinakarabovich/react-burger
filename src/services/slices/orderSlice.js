import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'oreder',
  initialState: {
    order: {},
    orderRequest: false,
    orderSuccess: false,
    orderError: false
  },
  reducers: {
    orderRequest: (state, action) => {
      return {
        orderRequest: true,
        orderSuccess: false,
        orderError: false,
      }
    },
    orderSuccess: (state, action) => {
      return {
        order: action.payload,
        orderRequest: false,
        orderSuccess: true,
        orderError: false,
      }
    },
    orderFail: (state, action) => {
      return {
        orderRequest: false,
        orderSuccess: false,
        orderError: true,
      }
    }
  }
});

export default orderSlice.reducer
export const {orderRequest,  orderSuccess, orderFail } = orderSlice.actions