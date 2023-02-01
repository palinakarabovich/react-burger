import React from 'react'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { addIngredient } from '../../services/slices/ingredientDetailsSlice'
import ingredientStyles from './ingredient.module.css';
import { TIngredient } from '../../types'
import { useTypedDispatch, useTypedSelector } from '../../services';

const Ingredient = () => {
  const params = useParams<{ id?: string }>();
  const { items } = useTypedSelector((store) => store.ingredients);
  const ingredient = items.find((el: TIngredient) => el._id === params.id);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    if (ingredient !== undefined)
    dispatch(addIngredient(ingredient));
  }, [])


  return (
    <div className={ingredientStyles.container}>
      <IngredientDetails />
    </div>
  )
}

export default Ingredient;