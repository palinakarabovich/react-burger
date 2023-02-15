import { ingredientsData } from '../../assets/ingredientsData';
import reducer, { ingredientsFail, ingredientsSuccess, ingredientsRequest, initialState } from './ingredientsSlice'

describe('Testing IngredientsSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should send a request to get all ingredients', () => {
    expect(reducer(initialState, ingredientsRequest())).toEqual(
      {
        items: [],
        itemsRequest: true,
        itemsSuccess: false,
        itemsError: false,
      }
    )
  })

  it('should send a request to get all ingredients with success', () => {
    const previousState = {
      items: [],
      itemsRequest: true,
      itemsSuccess: false,
      itemsError: false,
    }
    expect(reducer(previousState, ingredientsSuccess(ingredientsData))).toEqual(
      {
        items: ingredientsData,
        itemsRequest: false,
        itemsSuccess: true,
        itemsError: false,
      }
    )
  })

  it('should send a request to get all ingredients with error', () => {
    const previousState = {
      items: [],
      itemsRequest: true,
      itemsSuccess: false,
      itemsError: false,
    }
    expect(reducer(previousState, ingredientsFail())).toEqual(
      {
        items: [],
        itemsRequest: false,
        itemsSuccess: false,
        itemsError: true,
      }
    )
  })

});