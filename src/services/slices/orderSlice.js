import { createSlice } from '@reduxjs/toolkit';
import { ORDER_URL } from '../../utils/constans';
import { clean } from './constructorSlice'; 

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

export const setOrder = (ingredients) => dispatch => {
  dispatch(orderRequest());
  fetch(ORDER_URL, {
    method: 'POST',
    body: JSON.stringify({ingredients}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
  .then(data => {
    dispatch(orderSuccess(data))
    dispatch(clean())
  })
  .catch(err => {
    dispatch(orderFail())
  })
}

export default orderSlice.reducer
export const {orderRequest,  orderSuccess, orderFail } = orderSlice.actions