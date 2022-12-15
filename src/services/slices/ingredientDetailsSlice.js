import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
  name: 'currentIngredient',
  initialState: {
    item: null
  },
  reducers: {
    addIngredient: (state, action) => {
      return {
        item: action.payload,
      }
    },
    removeIngredient: (state) => {
      return {
        item: null,
      }
    }
  }
});

export default ingredientDetailsSlice.reducer
export const { addIngredient, removeIngredient } = ingredientDetailsSlice.actions
