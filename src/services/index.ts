import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ingredientsSlice from './slices/ingredientsSlice';
import ingredientDetailsSlice from './slices/ingredientDetailsSlice';
import constructorSlice from './slices/constructorSlice';
import orderSlice from './slices/orderSlice';
import authSlice from './slices/authSlice';
import resetPasswordSlice from './slices/resetPasswordSlice';
import orderInfoSlice from './slices/orderInfoSlice';
import allOrdersSlice from './slices/ordersAllSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { socketMiddleware } from './middlewares/socketMiddleware';
import { wsActions, wsActionsAuth } from './slices/ordersAllSlice';
import { SOCKET_All_ORDERS_URL, SOCKET_USER_ORDERS_URL } from '../utils/constans';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  currentIngredient: ingredientDetailsSlice,
  burgerConstructor: constructorSlice,
  order: orderSlice,
  user: authSlice,
  resetPassword: resetPasswordSlice,
  currentOrder: orderInfoSlice,
  allOrders: allOrdersSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [
    thunk,
    socketMiddleware(SOCKET_All_ORDERS_URL, wsActions, false),
    socketMiddleware(SOCKET_USER_ORDERS_URL, wsActionsAuth, true),
  ],
})

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

