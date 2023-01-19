import React from 'react'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/ingredient-details/ingredient-details'
import { useDispatch, useSelector } from 'react-redux'
import { addIngredient } from '../../services/slices/ingredientDetailsSlice'
import ingredientStyles from './ingredient.module.css';
import { TIngredient } from '../../types'

const Ingredient = () => {
  const params = useParams<{ id?: string }>();
  const { items } = useSelector((store: any) => store.ingredients);
  const ingredient = items.find((el: TIngredient) => el._id === params.id);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(addIngredient(ingredient));
  }, [])


  return (
    <div className={ingredientStyles.container}>
      <IngredientDetails />
    </div>
  )
}

export default Ingredient;