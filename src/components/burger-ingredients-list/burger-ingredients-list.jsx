import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsListStyles from './burger-ingredients-list.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';
import React from 'react';

const BurgerIngredientsList = React.forwardRef(({ title, ingredients }, ref) => {
  return (
    <>
      <h3 className={burgerIngredientsListStyles.title} ref={ref}>{title}</h3>
      <ul className={burgerIngredientsListStyles.list}>
        {
          ingredients.map((i) => (<li className={burgerIngredientsListStyles.card} key={i._id}><BurgerIngredientsCard ingredient={i} /></li>))
        }
      </ul>
    </>
  )
});

export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}