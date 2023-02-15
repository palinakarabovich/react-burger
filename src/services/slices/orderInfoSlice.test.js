import { orderOneData, orderTwoData } from '../../assets/orderData';
import reducer, { addOrder, removeOrder, initialState } from './orderInfoSlice'

describe('Testing OrderInfoSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should add information about selected order', () => {
    expect(reducer(initialState, addOrder(orderOneData))).toEqual(
      { order: orderOneData }
    )
  })

  it('should replace previous selected order with a new one', () => {
    const previousState = { order: orderOneData };
    expect(reducer(previousState, addOrder(orderTwoData))).toEqual(
      { order: orderTwoData }
    )
  })

  it('should clean itself', () => {
    const previousState = { item: orderTwoData };
    expect(reducer(previousState, removeOrder())).toEqual(
      { order: null }
    )
  })
});