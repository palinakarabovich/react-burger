export const SERVER_URL = 'https://norma.nomoreparties.space/api';

export const SOCKET_All_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const SOCKET_USER_ORDERS_URL = `wss://norma.nomoreparties.space/orders`;

export const maxIngredientsShowed = 4;

export const WS_INIT: 'WS_INIT' = 'WS_INIT';
export const WS_AUTH_INIT: 'WS_AUTH_INIT' = 'WS_AUTH_INIT';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_SEND_AUTH_MESSAGE: 'WS_SEND_AUTH_MESSAGE' = 'WS_SEND_AUTH_MESSAGE';

export const ORDER_WAITING_TIME_WARNINGS = [
  'Sending your order to the orbital station...',
  'It could take some time...',
  'Sending signal to space is not so fast...',
  'Connecting with the orbital station...',
  'Your order is travelling through the space...',
  'Your burger is experiencing zero-gravity delays...',
  'The cosmic delivery drones are en route to your coordinates..',
  'Patience, for your burger is on a cosmic voyage...',
  'Your order is traversing cosmic distances...'
]