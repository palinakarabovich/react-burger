import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../types';

export type TIngredientDetailsSlice ={
  item: TIngredient | null;
}

export const initialState: TIngredientDetailsSlice = {
  item: null,
}
const ingredientDetailsSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    addIngredientDetails: (state, action: PayloadAction<TIngredient>) => {
      return {
        item: action.payload,
      }
    },
    removeIngredient: () => {
      return {
        item: null,
      }
    }
  }
});

export default ingredientDetailsSlice.reducer;
export const { addIngredientDetails, removeIngredient } = ingredientDetailsSlice.actions;
