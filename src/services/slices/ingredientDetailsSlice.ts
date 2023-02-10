import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../types';

type TIngredientDetailsSlice ={
  item: TIngredient | null;
}

const initialState: TIngredientDetailsSlice = {
  item: null,
}
const ingredientDetailsSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
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
export const { addIngredient, removeIngredient } = ingredientDetailsSlice.actions;
