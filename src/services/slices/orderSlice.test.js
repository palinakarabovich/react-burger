import { submittedOrder } from '../../assets/orderData';
import reducer, { orderRequest, orderSuccess, orderFail, cleanOrder, initialState } from './orderSlice'

describe('Testing OrderSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should send a request to start preparing an order', () => {
    expect(reducer(initialState, orderRequest())).toEqual(
      {
        order: undefined,
        orderRequest: true,
        orderSuccess: false,
        orderError: false,
        orderModalOpen: true,
      }
    )
  })

  it('should send a request to start preparing an order with success', () => {
    const previousState = {
      order: undefined,
      orderRequest: true,
      orderSuccess: false,
      orderError: false,
      orderModalOpen: true,
    }
    expect(reducer(previousState, orderSuccess(submittedOrder))).toEqual(
      {
        order: submittedOrder,
        orderRequest: false,
        orderSuccess: true,
        orderError: false,
        orderModalOpen: true,
      }
    )
  })

  it('should send a request to start preparing an order with error', () => {
    const previousState = {
      order: undefined,
      orderRequest: true,
      orderSuccess: false,
      orderError: false,
      orderModalOpen: true,
    }
    expect(reducer(previousState, orderFail())).toEqual(
      {
        order: undefined,
        orderRequest: false,
        orderSuccess: false,
        orderError: true,
        orderModalOpen: false,
      }
    )
  })

  it('should clean itself', () => {
    const previousState = {
      order: submittedOrder,
      orderRequest: false,
      orderSuccess: true,
      orderError: false,
      orderModalOpen: true,
    }
    expect(reducer(previousState, cleanOrder())).toEqual(
      initialState
    )
  })

});