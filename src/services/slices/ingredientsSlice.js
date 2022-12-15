import { createSlice } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constans';

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    itemsRequest: false,
    itemsSuccess: false,
    itemsError: false
  },
  reducers: {
    ingredientsRequest: (state, action) => {
      return {
        itemsRequest: true,
        itemsSuccess: false,
        itemsError: false,
      }
    },
    ingredientsSuccess: (state, action) => {
      return {
        items: action.payload,
        itemsRequest: false,
        itemsSuccess: true,
        itemsError: false,
      }
    },
    ingredientsFail: (state, action) => {
      return {
        itemsRequest: false,
        itemsSuccess: false,
        itemsError: true,
      }
    }
  }
});

export const getIngredients = () => dispatch => {
  dispatch(ingredientsRequest());
  fetch(SERVER_URL)
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
  .then((data) => dispatch(ingredientsSuccess(data.data)))
  .catch(() => dispatch(ingredientsFail()));
}

export default ingredientsSlice.reducer
export const { ingredientsFail, ingredientsSuccess, ingredientsRequest} = ingredientsSlice.actions