import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './slices/ingredientsSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import constructorSlice from './slices/constructorSlice';
import orderSlice from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  currentIngredient: ingredientDetailsSlice,
  burgerConstructor: constructorSlice,
  order: orderSlice,
})

export const store = configureStore({
  reducer: rootReducer
})