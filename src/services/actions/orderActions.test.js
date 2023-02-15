import { setOrder } from "./orderActions";
import { ingredientsData } from "../../assets/ingredientsData";
import { submittedOrder } from "../../assets/orderData";

global.fetch = jest.fn();

const mockFetch = fetch;

describe('should set order', () => {

  const dispatch = jest.fn();

  it('set order with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: submittedOrder,
      })
    })
    const thunk = setOrder(ingredientsData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(3);
    expect(calls[0]).toEqual([{ type: 'order/orderRequest', payload: undefined }]);
    expect(calls[1]).toEqual([{ type: 'order/orderSuccess', payload: { data: submittedOrder } }]);
    expect(calls[2]).toEqual([{ type: 'burgerConstructor/clean', payload: undefined }]);
  })

  it('set order with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = setOrder(ingredientsData);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([{ type: 'order/orderRequest', payload: undefined }]);
    expect(calls[1]).toEqual([{ type: 'order/orderFail', payload: undefined }]);
  })

})