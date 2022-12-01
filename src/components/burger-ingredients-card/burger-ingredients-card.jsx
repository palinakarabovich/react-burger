import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';


const BurgerIngredientsCard = ({ ingredient, modalOpen, chosenIngredients }) => {

  const [quantity, setQuantity] = React.useState(0);

  React.useEffect(() => {
    if (chosenIngredients.length !== 0) {
      setQuantity(chosenIngredients.filter((i) => i._id === ingredient._id).length);
    }
  }, [chosenIngredients]);

  const onClickIngredient = () => {
    modalOpen(ingredient);
  }

  return (
    <article className={burgerIngredientsCardStyles.card} onClick={onClickIngredient}>
      {quantity >= 1 && (<div className={burgerIngredientsCardStyles.quantity}>{quantity}</div>)}
      <img src={ingredient.image} className={burgerIngredientsCardStyles.image} alt={ingredient.name} />
      <p className={burgerIngredientsCardStyles.price}>{ingredient.price}<span className={burgerIngredientsCardStyles.currency}><CurrencyIcon /></span></p>
      <h4 className={burgerIngredientsCardStyles.title}>{ingredient.name}</h4>
    </article>
  )
}

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.shape(ingredientType),
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  modalOpen: PropTypes.func
}