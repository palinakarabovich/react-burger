import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './slices/ingredientsSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import constructorSlice from './slices/constructorSlice';
import orderSlice from './slices/orderSlice';
import authSlice from './slices/authSlice';
import resetPasswordSlice from './slices/resetPasswordSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  currentIngredient: ingredientDetailsSlice,
  burgerConstructor: constructorSlice,
  order: orderSlice,
  user: authSlice,
  resetPassword: resetPasswordSlice
})

export const store = configureStore({
  reducer: rootReducer
})