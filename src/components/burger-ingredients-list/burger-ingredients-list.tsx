import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsListStyles from './burger-ingredients-list.module.css';
import React from 'react';
import { TIngredient } from '../../types';

<<<<<<< HEAD:src/components/burger-ingredients-list/burger-ingredients-list.tsx
interface IBurgerIngredientsListProps {
  title: string;
  ingredients: Array<TIngredient>;
}

type Ref = HTMLHeadingElement;

const BurgerIngredientsList = React.forwardRef<Ref, IBurgerIngredientsListProps>(({ title, ingredients }, ref) => {
=======
const BurgerIngredientsList = React.forwardRef(({ title, ingredients }, ref) => {
>>>>>>> main:src/components/burger-ingredients-list/burger-ingredients-list.jsx
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

<<<<<<< HEAD:src/components/burger-ingredients-list/burger-ingredients-list.tsx
export default BurgerIngredientsList;
=======
export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}
>>>>>>> main:src/components/burger-ingredients-list/burger-ingredients-list.jsx
