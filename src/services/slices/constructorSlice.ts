import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../types';

type TCoconstructorSlice = {
  items: Array<TIngredient>,
  price: number,
  bun: TIngredient | null;
}

const initialState: TCoconstructorSlice = {
  items: [],
  price: 0,
  bun: null
}

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.items.push({ ...action.payload, uuid: uuidv4() });
      state.price += action.payload.price;
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      if (state.bun) {
        state.price -= state.bun.price * 2
      }
      state.bun = action.payload
      state.price += action.payload.price * 2
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.price -= state.items[action.payload].price
      state.items.splice(action.payload, 1)
    },
    changeIngredientsOrder: (state, action: PayloadAction<Array<number>>) => {
      const firstIndex = action.payload[0];
      const secondIndex = action.payload[1];
      const temporary = state.items[firstIndex];
      state.items[firstIndex] = state.items[secondIndex];
      state.items[secondIndex] = temporary;
    },
    clean: () => {
      return {
        items: [],
        price: 0,
        bun: null
      }
    }
  }
});

export default constructorSlice.reducer;
export const { addIngredient, setBun, clean, removeIngredient, changeIngredientsOrder } = constructorSlice.actions;

