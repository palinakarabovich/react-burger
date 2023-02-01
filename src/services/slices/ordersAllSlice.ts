import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { IOrder } from '../../types';
import { WS_AUTH_INIT, WS_INIT, WS_SEND_AUTH_MESSAGE, WS_SEND_MESSAGE } from '../../utils/constans';

export type TSockets = {
  wsConnected: boolean;
  wsConnectedAuth: boolean;
  orders: Array<IOrder>;
  ordersAuth: Array<IOrder>;
  total: number | null;
  totalToday: number | null;
}

export interface ISocketActions {
  wsInit: ActionCreatorWithoutPayload<string>;
  wsSendMessage: ActionCreatorWithPayload<string, string>;
  onOpen: ActionCreatorWithoutPayload<string>;
  onClose: ActionCreatorWithoutPayload<string>;
  onError: ActionCreatorWithoutPayload<string>;
  onMessage: ActionCreatorWithPayload<any, string>;
}

type TMessage = {
  total: number;
  totalToday: number;
  orders: Array<IOrder>;
}

const initialState: TSockets = {
  wsConnected: false,
  orders: [],
  ordersAuth: [],
  total: null,
  totalToday: null,
  wsConnectedAuth: false,
}

export const wsInit = createAction<void>(WS_INIT);
export const wsAuthInit = createAction<void>(WS_AUTH_INIT);
export const wsSendMessage = createAction<string>(WS_SEND_MESSAGE);
export const wsSendAuthMessage = createAction<string>(WS_SEND_AUTH_MESSAGE);

const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {
    wsConnectedSuccess: (state: TSockets) => {
      state.wsConnected = true;
    },
    wsConnectedError: (state: TSockets) => {
      state.wsConnected = false;
    },
    wsConnectedClosed: (state: TSockets) => {
      state.wsConnected = false;
    },
    wsGetMessage: (state: TSockets, action: PayloadAction<TMessage>) => {
      const { total, totalToday, orders } = action.payload;
      state.total = total;
      state.totalToday = totalToday;
      state.orders = orders;
    },
    wsConnectedSuccessAuth: (state: TSockets) => {
      state.wsConnectedAuth = true;
    },
    wsConnectedErrorAuth: (state: TSockets) => {
      state.wsConnectedAuth = false;
    },
    wsConnectedClosedAuth: (state: TSockets) => {
      state.wsConnectedAuth = false;
    },
    wsGetMessageAuth: (state: TSockets, action: PayloadAction<TMessage>) => {
      const { orders } = action.payload;
      state.ordersAuth = orders;
    },
  },
})

export default allOrdersSlice.reducer;
const {
  wsConnectedSuccess,
  wsConnectedError,
  wsConnectedClosed,
  wsGetMessage,
  wsConnectedSuccessAuth,
  wsConnectedClosedAuth,
  wsConnectedErrorAuth,
  wsGetMessageAuth,
} = allOrdersSlice.actions;

export const wsActions: ISocketActions = {
  wsInit,
  wsSendMessage,
  onOpen: wsConnectedSuccess,
  onClose: wsConnectedClosed,
  onError: wsConnectedError,
  onMessage: wsGetMessage,
};

export const wsActionsAuth: ISocketActions = {
  wsInit: wsAuthInit,
  wsSendMessage: wsSendAuthMessage,
  onOpen: wsConnectedSuccessAuth,
  onClose: wsConnectedClosedAuth,
  onError: wsConnectedErrorAuth,
  onMessage: wsGetMessageAuth,
}
