import { TIngredient } from "../types";

type TGetBurgerIngredientsObjWithCountReduceAcc = {
  item: { [name: string]: TIngredient }, count: { [name: string]: number }
}

export const countPrice = (ingredients: Array<TIngredient>) => ingredients?.reduce((acc: number, curr: TIngredient) => acc += curr.price, 0);

export const getIngredients = (ingredients: Array<string>, allIngredients: Array<TIngredient>) => (
  ingredients?.map((id: string) => (allIngredients.filter((item: TIngredient) => item._id === id))))?.flat();

export const countBurgerIngredients = (arr: Array<TIngredient>) => arr?.reduce((acc: TGetBurgerIngredientsObjWithCountReduceAcc, curr: TIngredient) => {
  const id = curr._id
  acc.item[id] = curr;
  acc.count[id] = (acc.count[id] || 0) + 1
  return acc
}
  , { item: {}, count: {} })


