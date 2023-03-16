import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../types';

export type TIngredientsSlice = {
  items: Array<TIngredient>;
  itemsRequest: boolean;
  itemsSuccess: boolean;
  itemsError: boolean;
}

export const initialState: TIngredientsSlice = {
  items: [],
  itemsRequest: false,
  itemsSuccess: false,
  itemsError: false
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientsRequest: () => {
      return {
        items: [],
        itemsRequest: true,
        itemsSuccess: false,
        itemsError: false,
      }
    },
    ingredientsSuccess: (state, action: PayloadAction<Array<TIngredient>>) => {
      console.log(action.payload);
      return {
        items: action.payload,
        itemsRequest: false,
        itemsSuccess: true,
        itemsError: false,
      }
    },
    ingredientsFail: () => {
      return {
        items: [],
        itemsRequest: false,
        itemsSuccess: false,
        itemsError: true,
      }
    }
  }
});

export default ingredientsSlice.reducer
export const { ingredientsFail, ingredientsSuccess, ingredientsRequest } = ingredientsSlice.actions