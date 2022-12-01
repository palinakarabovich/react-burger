import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsListStyles from './burger-ingredients-list.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';

const BurgerIngredientsList = ({ title, ingredients, chosenIngredients, modalOpen }) => {
  return (
    <>
      <h3 className={burgerIngredientsListStyles.title}>{title}</h3>
      <ul className={burgerIngredientsListStyles.list}>
        {
          ingredients.map((i) => (<li className={burgerIngredientsListStyles.card} key={i._id}><BurgerIngredientsCard ingredient={i} modalOpen={modalOpen} chosenIngredients={chosenIngredients} /></li>))
        }
      </ul>
    </>
  )
}

export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  title: PropTypes.string,
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  modalOpen: PropTypes.func

}