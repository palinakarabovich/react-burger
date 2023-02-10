import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { addIngredient } from '../../services/slices/ingredientDetailsSlice';
import { TIngredient, DraggableTypes } from '../../types';
import { useTypedDispatch, useTypedSelector } from '../../services';

interface IBurgerIngredientsCard {
  ingredient: TIngredient;
};

const BurgerIngredientsCard: React.FunctionComponent<IBurgerIngredientsCard> = ({ ingredient }) => {

  const [quantity, setQuantity] = React.useState<number>(0);
  const chosenIngredients = useTypedSelector((store) => store.burgerConstructor.items);
  const [selectedBun, setSelectedBun] = React.useState<boolean>(false);
  const { bun } = useTypedSelector((store) => store.burgerConstructor);
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: DraggableTypes.ingredients,
    item: ingredient as TIngredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  React.useEffect(() => {
    if (chosenIngredients.length !== 0) {
      setQuantity(chosenIngredients.filter((i: TIngredient) => i._id === ingredient._id).length);
    } else setQuantity(0);
  }, [chosenIngredients]);

  React.useEffect(() => {
    if (bun !== null && ingredient._id === bun._id) {
      setSelectedBun(true);
    } else setSelectedBun(false);
  }, [bun]);

  const onClickIngredient = () => {
    dispatch(addIngredient(ingredient));
  }

  return (
    <Link to={{
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: location, openIngredientModal: true }
    }} className={burgerIngredientsCardStyles.link}>
      <article className={burgerIngredientsCardStyles.card} onClick={onClickIngredient} draggable style={{ opacity }} ref={ref}>
        {quantity >= 1
          ? (<div className={burgerIngredientsCardStyles.quantity}>{quantity}</div>)
          : selectedBun
          && (<div className={burgerIngredientsCardStyles.quantity}>1</div>)
        }
        <img src={ingredient.image} className={burgerIngredientsCardStyles.image} alt={ingredient.name} />
        <p className={burgerIngredientsCardStyles.price}>{ingredient.price}<span className={burgerIngredientsCardStyles.currency}><CurrencyIcon type='primary' /></span></p>
        <h4 className={burgerIngredientsCardStyles.title}>{ingredient.name}</h4>
      </article>
    </Link>
  )
}

export default BurgerIngredientsCard;