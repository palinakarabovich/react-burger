import { createSlice } from '@reduxjs/toolkit';

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

export default ingredientsSlice.reducer
export const { ingredientsFail, ingredientsSuccess, ingredientsRequest } = ingredientsSlice.actions