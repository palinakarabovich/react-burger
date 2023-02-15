import { ingredientOneData, ingredientsBunData, ingredientTwoData } from '../../assets/ingredientsData';
import reducer, { addIngredient, setBun, clean, removeIngredient, changeIngredientsOrder, initialState } from './constructorSlice'

describe('Testing ConstructorSlice', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      initialState
    )
  })

  it('should add selected ingredient to the constructor without bun', () => {
    expect(reducer(initialState, addIngredient(ingredientOneData))).toEqual(
      {
        items: [ingredientOneData],
        price: 0 + ingredientOneData.price,
        bun: null
      }
    )
  })

  it('should add selected bun to the constructor with ingredients', () => {
    const previousState = {
      items: [ingredientOneData],
      price: 0 + ingredientOneData.price,
      bun: null
    }
    expect(reducer(previousState, setBun(ingredientsBunData))).toEqual(
      {
        items: [ingredientOneData],
        price: 0 + ingredientOneData.price + ingredientsBunData.price * 2,
        bun: ingredientsBunData
      }
    )
  })

  it('should add selected bun to the constructor without ingredients', () => {
    expect(reducer(initialState, setBun(ingredientsBunData))).toEqual(
      {
        items: [],
        price: 0 + ingredientsBunData.price * 2,
        bun: ingredientsBunData
      }
    )
  })

  it('should add second ingredient to the constructor with bun', () => {
    const previousState = {
      items: [ingredientOneData],
      price: 0 + ingredientOneData.price + ingredientsBunData.price * 2,
      bun: ingredientsBunData
    }
    expect(reducer(previousState, addIngredient(ingredientTwoData))).toEqual(
      {
        items: [ingredientOneData, ingredientTwoData],
        price: 0 + ingredientOneData.price + ingredientsBunData.price * 2 + ingredientTwoData.price,
        bun: ingredientsBunData
      }
    )
  })

  it('should add second ingredient to the constructor without bun', () => {
    const previousState = {
      items: [ingredientOneData],
      price: 0 + ingredientOneData.price,
      bun: null
    }
    expect(reducer(previousState, addIngredient(ingredientTwoData))).toEqual(
      {
        items: [ingredientOneData, ingredientTwoData],
        price: 0 + ingredientOneData.price + ingredientTwoData.price,
        bun: null
      }
    )
  })

  it('should remove ingredient from the constructor with bun', () => {
    const previousState = {
      items: [ingredientOneData, ingredientTwoData],
      price: 0 + ingredientOneData.price + ingredientsBunData.price * 2 + ingredientTwoData.price,
      bun: ingredientsBunData
    }
    expect(reducer(previousState, removeIngredient(1))).toEqual(
      {
        items: [ingredientOneData],
        price: 0 + ingredientOneData.price + ingredientsBunData.price * 2,
        bun: ingredientsBunData,
      }
    )
  })

  it('should remove ingredient from the constructor without bun', () => {
    const previousState = {
      items: [ingredientOneData, ingredientTwoData],
      price: 0 + ingredientOneData.price + ingredientTwoData.price,
      bun: null
    }
    expect(reducer(previousState, removeIngredient(1))).toEqual(
      {
        items: [ingredientOneData],
        price: 0 + ingredientOneData.price,
        bun: null,
      }
    )
  })

  it('should change ingredients order in the constructor with bun', () => {
    const previousState = {
      items: [ingredientOneData, ingredientTwoData],
      price: 0 + ingredientOneData.price + ingredientsBunData.price * 2 + ingredientTwoData.price,
      bun: ingredientsBunData
    }
    expect(reducer(previousState, changeIngredientsOrder([1,0]))).toEqual(
      {
        items: [ingredientTwoData,ingredientOneData],
        price: 0 + ingredientOneData.price + ingredientsBunData.price * 2 + ingredientTwoData.price,
        bun: ingredientsBunData,
      }
    )
  })

  it('should change ingredients order in the constructor without bun', () => {
    const previousState = {
      items: [ingredientOneData, ingredientTwoData],
      price: 0 + ingredientOneData.price + ingredientTwoData.price,
      bun: null
    }
    expect(reducer(previousState, changeIngredientsOrder([0,1]))).toEqual(
      {
        items: [ingredientTwoData, ingredientOneData],
        price: 0 + ingredientOneData.price + ingredientTwoData.price,
        bun: null,
      }
    )
  })

  it('should clean itself', () => {
    const previousState = {
      items: [ingredientOneData, ingredientTwoData],
      price: 0 + ingredientOneData.price + ingredientsBunData.price * 2 + ingredientTwoData.price,
      bun: ingredientsBunData
    }
    expect(reducer(previousState, clean())).toEqual(
     initialState
    )
  })

});