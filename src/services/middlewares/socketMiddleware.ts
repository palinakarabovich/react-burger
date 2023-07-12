import { getCookie } from '../../utils/cookie';
import { ISocketActions } from '../slices/ordersAllSlice';
import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit';
import { translateOrders } from '../../utils/translateOrders';

export const socketMiddleware = (wsUrl: string, wsActions: ISocketActions, auth: boolean) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const token = auth ? getCookie('accessToken') : null;
      if (type === wsInit.toString()) {
        socket = token ? new WebSocket(`${wsUrl}?token=${token.split(' ')[1]}`) : new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        }
        socket.onerror = () => {
          dispatch(onError());
        }
        socket.onmessage = async (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(onMessage(await translateOrders(restParsedData)));
        }
        socket.onclose = () => {
          dispatch(onClose());
        }
        if (type === wsSendMessage.toString()) {
          const message = token ? { ...payload, token } : { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    }
  }
}