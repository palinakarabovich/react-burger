import { ingredientOneData, ingredientTwoData } from '../../assets/ingredientsData'
import reducer, { addIngredient, removeIngredient, initialState } from './ingredientDetailsSlice'

describe('Testing IngredintDetailSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should add ingredient', () => {
    expect(reducer(initialState, addIngredient(ingredientOneData))).toEqual(
      { item: ingredientOneData }
    )
  })

  it('should replace current ingredient', () => {
    const previousState = { item: ingredientOneData };
    expect(reducer(previousState, addIngredient(ingredientTwoData))).toEqual(
      { item: ingredientTwoData }
    )
  })

  it('should clean itself', () => {
    const previousState = { item: ingredientOneData };
    expect(reducer(previousState, removeIngredient())).toEqual(
      { item: null }
    )
  })
});