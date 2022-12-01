import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsListStyles from './burger-ingredients-list.module.css';
import PropTypes from 'prop-types';

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
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })),
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })),
  modalOpen: PropTypes.func

}