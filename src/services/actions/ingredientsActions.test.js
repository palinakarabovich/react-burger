import { getIngredients } from "./ingredientsActions";
import { ingredientsData } from "../../assets/ingredientsData";

global.fetch = jest.fn();

const mockFetch = fetch;

describe('should get ingredients', () => {

  const dispatch = jest.fn();

  it('get ingredients with success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: ingredientsData,
        success: true
      })
    })
    const thunk = getIngredients();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([{ type: 'ingredients/ingredientsRequest', payload: undefined }]);
    expect(calls[1]).toEqual([{ type: 'ingredients/ingredientsSuccess', payload: ingredientsData }]);
  })

  it('get ingredients with error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
    })
    const thunk = getIngredients();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(dispatch).toBeCalledTimes(2);
    expect(calls[0]).toEqual([{ type: 'ingredients/ingredientsRequest', payload: undefined }]);
    expect(calls[1]).toEqual([{ type: 'ingredients/ingredientsFail', payload: undefined }]);
  })
})