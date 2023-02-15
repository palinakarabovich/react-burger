import { ordersData } from '../../assets/orderData';
import reducer, { wsActions, wsActionsAuth, initialState } from './ordersAllSlice'

describe('Testing OrderAllSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should open web-socket connection without auth', () => {
    expect(reducer(initialState, wsActions.onOpen())).toEqual(
      {
        wsConnected: true,
        orders: [],
        ordersAuth: [],
        total: null,
        totalToday: null,
        wsConnectedAuth: false,
      }
    )
  })

  it('should open web-socket connection with auth', () => {
    expect(reducer(initialState, wsActionsAuth.onOpen())).toEqual(
      {
        wsConnected: false,
        orders: [],
        ordersAuth: [],
        total: null,
        totalToday: null,
        wsConnectedAuth: true,
      }
    )
  })

  it('should open web-socket connection without auth with error', () => {
    expect(reducer(initialState, wsActions.onError())).toEqual(
      initialState
    )
  })

  it('should open web-socket connection with auth with error', () => {
    expect(reducer(initialState, wsActionsAuth.onError())).toEqual(
      initialState
    )
  })

  it('should get messages without auth', () => {
    const previousState = {
      wsConnected: true,
      orders: [],
      ordersAuth: [],
      total: null,
      totalToday: null,
      wsConnectedAuth: false,
    }
    expect(reducer(previousState, wsActions.onMessage(ordersData))).toEqual(
      {
        wsConnected: true,
        orders: ordersData.orders,
        ordersAuth: [],
        total: ordersData.total,
        totalToday: ordersData.totalToday,
        wsConnectedAuth: false,
      }
    )
  })

  it('should get messages with auth', () => {
    const previousState = {
      wsConnected: false,
      orders: [],
      ordersAuth: [],
      total: null,
      totalToday: null,
      wsConnectedAuth: true,
    }
    expect(reducer(previousState, wsActionsAuth.onMessage(ordersData))).toEqual(
      {
        wsConnected: false,
        orders: [],
        ordersAuth: ordersData.orders,
        total: null,
        totalToday: null,
        wsConnectedAuth: true,
      }
    )
  })

  it('should close web-socket connection without auth', () => {
    const previousState = {
      wsConnected: true,
      orders: ordersData.orders,
      ordersAuth: [],
      total: ordersData.total,
      totalToday: ordersData.totalToday,
      wsConnectedAuth: false,
    }
    expect(reducer(previousState, wsActions.onClose())).toEqual(
      {
        wsConnected: false,
        orders: ordersData.orders,
        ordersAuth: [],
        total: ordersData.total,
        totalToday: ordersData.totalToday,
        wsConnectedAuth: false,
      }
    )
  })

  it('should close web-socket connection with auth', () => {
    const previousState = {
      wsConnected: false,
      orders: [],
      ordersAuth: ordersData.orders,
      total: null,
      totalToday: null,
      wsConnectedAuth: true,
    }
    expect(reducer(previousState, wsActionsAuth.onClose())).toEqual(
      {
        wsConnected: false,
        orders: [],
        ordersAuth: ordersData.orders,
        total: null,
        totalToday: null,
        wsConnectedAuth: false,
      }
    )
  })

});