import burgerIngredientsCardStyles from './burger-ingredients-card.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { addIngredientDetails } from '../../services/slices/ingredientDetailsSlice';
import { TIngredient, DraggableTypes } from '../../types';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { getCurrentDimension } from '../../utils/getCurrentDemention';
import { setBun, addIngredient } from '../../services/slices/constructorSlice';

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
  const [screenSize, setScreenSize] = React.useState(getCurrentDimension());

  const [{ opacity }, ref] = useDrag({
    type: DraggableTypes.ingredients,
    item: ingredient as TIngredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

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
    dispatch(addIngredientDetails(ingredient));
  }

  const resizeHandler = () => {
    setScreenSize(getCurrentDimension())
  }

  const onAddIngredientClick = () => {
    dispatch(ingredient.type === 'bun' ? setBun(ingredient) : addIngredient(ingredient))
  }

  return (
    <div className={burgerIngredientsCardStyles.card} onClick={onClickIngredient} draggable={screenSize.width > 1100 ? true : false} style={{ opacity }} ref={ref}>
      <Link to={{
        pathname: `/react-burger/ingredients/${ingredient._id}`,
        state: { background: location, openIngredientModal: true }
      }} className={burgerIngredientsCardStyles.link}>
        {quantity >= 1
          ? (<div className={burgerIngredientsCardStyles.quantity}>{quantity}</div>)
          : selectedBun
          && (<div className={burgerIngredientsCardStyles.quantity}>1</div>)
        }
        <img src={ingredient.image} className={burgerIngredientsCardStyles.image} alt={ingredient.name} />
        <p className={burgerIngredientsCardStyles.price}>{ingredient.price}<span className={burgerIngredientsCardStyles.currency}><CurrencyIcon type='primary' /></span></p>
        <h4 className={burgerIngredientsCardStyles.title}>{ingredient.name}</h4>
      </Link>
        <div className={burgerIngredientsCardStyles.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={onAddIngredientClick}>
            Add
          </Button>
          </div>
    </div>
  )
}

export default BurgerIngredientsCard;