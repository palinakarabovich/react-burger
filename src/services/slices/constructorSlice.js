import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    items: [],
    price: 0,
    bun: null
  },
  reducers: {
    addIngredient: (state, action) => {
      state.items.push({ ...action.payload, uuid: uuidv4() });
      state.price += action.payload.price;
    },
    setBun: (state, action) => {
      if (state.bun) {
        state.price -= state.bun.price * 2
      }
      state.bun = action.payload
      state.price += action.payload.price * 2
    },
    removeIngredient: (state, action) => {
      state.price -= state.items[action.payload].price
      state.items.splice(action.payload, 1)
    },
    changeIngredientsOrder: (state, action) => {
      const firstIndex = action.payload[0];
      const secondIndex = action.payload[1];
      const temporary = state.items[firstIndex];
      state.items[firstIndex] = state.items[secondIndex];
      state.items[secondIndex] = temporary;
    },
    clean: (state, action) => {
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

