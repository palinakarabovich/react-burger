import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsListStyles from './burger-ingredients-list.module.css';
import React from 'react';
import { TIngredient } from '../../types';

interface IBurgerIngredientsListProps {
  title: string;
  ingredients: Array<TIngredient>;
}

type Ref = HTMLHeadingElement;

const BurgerIngredientsList = React.forwardRef<Ref, IBurgerIngredientsListProps>(({ title, ingredients }, ref) => {
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
