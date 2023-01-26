import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { addIngredient } from '../../services/slices/ingredientDetailsSlice';

const BurgerIngredientsCard = ({ ingredient }) => {

  const [quantity, setQuantity] = React.useState(0);
  const chosenIngredients = useSelector((store) => store.burgerConstructor.items);
  const [selectedBun, setSelectedBun] = React.useState(false);
  const { bun } = useSelector((store) => store.burgerConstructor);
  const history = useHistory();
  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: 'ingredients',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  React.useEffect(() => {
    if (chosenIngredients.length !== 0) {
      setQuantity(chosenIngredients.filter((i) => i._id === ingredient._id).length);
    } else setQuantity(0);
  }, [chosenIngredients]);

  React.useEffect(() => {
    if (bun !== null && ingredient._id === bun._id) {
      setSelectedBun(true);
    } else setSelectedBun(false);
  }, [bun]);

  const onClickIngredient = () => {
    const _location = {
      pathname: `/ingredients/${ingredient._id}`,
      state: { openIngredientModal: true }
    }
    history.push(_location)
    dispatch(addIngredient(ingredient));
  }

  return (
    <article className={burgerIngredientsCardStyles.card} onClick={onClickIngredient} draggable style={{ opacity }} ref={ref}>
      {quantity >= 1
        ? (<div className={burgerIngredientsCardStyles.quantity}>{quantity}</div>)
        : selectedBun
        && (<div className={burgerIngredientsCardStyles.quantity}>1</div>)
      }
      <img src={ingredient.image} className={burgerIngredientsCardStyles.image} alt={ingredient.name} />
      <p className={burgerIngredientsCardStyles.price}>{ingredient.price}<span className={burgerIngredientsCardStyles.currency}><CurrencyIcon /></span></p>
      <h4 className={burgerIngredientsCardStyles.title}>{ingredient.name}</h4>
    </article>
  )
}

export default BurgerIngredientsCard;

BurgerIngredientsCard.propTypes = {
  ingredient: PropTypes.shape(ingredientType)
}