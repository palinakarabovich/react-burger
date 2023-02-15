import burgerConstructorStyles from './burger-constructor.module.css'
import { Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { useDrop } from 'react-dnd';
import { setBun, addIngredient, removeIngredient, clean } from '../../services/slices/constructorSlice';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { setOrder } from '../../services/actions/orderActions';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TIngredient, DraggableTypes } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = () => {

  const { items, price, bun } = useTypedSelector((store) => store.burgerConstructor);
  const { loggedIn } = useTypedSelector((store) => store.user);
  const { orderRequest, orderSuccess } = useTypedSelector((store) => store.order);
  const [isPlaceholder, setPlaceholder] = React.useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const location = useLocation();

  const [{ border }, dropTarget] = useDrop({
    accept: DraggableTypes.ingredients,
    drop(item: TIngredient) {
      dispatch(item.type === 'bun' ? setBun(item) : addIngredient(item))
    },
    collect: monitor => ({
      border: monitor.isOver() ? '2px solid #4C4CFF' : '',
    })
  });

  React.useEffect(() => {
    orderSuccess && dispatch(clean());
  }, [orderSuccess])

  React.useEffect(() => {
    if (bun !== null) {
      setPlaceholder(false);
    }
  }, [bun])

  const onOrderButtonClick = () => {
    if (!loggedIn) {
      history.push({ pathname: '/login' });
      return;
    }
    if (bun !== null) {
      history.push({
        pathname: '/',
        state: {
          background: location
        }
      });
      dispatch(setOrder(new Array<string>().concat(
        items.map((item: TIngredient) => item._id),
        bun._id,
        bun._id
      )));
    } else {
      setPlaceholder(true);
    }
  }

  const handleClose = (index: number) => {
    dispatch(removeIngredient(index));
  }

  return (
    <section className={burgerConstructorStyles.wrapper} ref={dropTarget}>
      <div className={`${burgerConstructorStyles.ingredients} ${bun === null && items.length === 0 ? burgerConstructorStyles.ingredientsEmpty : ''}`} style={{ border }} id='burger-constructor'>
        <div className={burgerConstructorStyles.bun}>
          {bun && <BurgerConstructorElement type='top' ingredient={bun} isLocked={true} />}
        </div>
        <ul className={burgerConstructorStyles.list}>
          {items.length !== 0
            ? items.map((i: TIngredient, index: number) => {
              if (i.type !== 'bun') {
                return (
                  <li key={uuidv4()} className={burgerConstructorStyles.element}>
                    <div className={burgerConstructorStyles.dragIcon}>
                      <DragIcon type="primary" />
                    </div>
                    <BurgerConstructorElement ingredient={i} index={index} handleClose={() => handleClose(index)} isDrag={true} />
                  </li>)
              }
            }
            )
            : bun === null
            && <p className={burgerConstructorStyles.placeholder}>Перетащите ингредиенты сюда</p>}
        </ul>
        <div className={burgerConstructorStyles.bun}>
          {bun && <BurgerConstructorElement type='bottom' ingredient={bun} isLocked={true} />}
        </div>
        {
          isPlaceholder && <p className={burgerConstructorStyles.error}> Вы не можете заказать бургет без булочки :(</p>
        }
      </div>
      <div className={burgerConstructorStyles.info}>
        <p className={burgerConstructorStyles.price}>{price}<span className={burgerConstructorStyles.currency}><CurrencyIcon type="primary" /></span></p>
        <Button htmlType="button" type="primary" size="large" onClick={onOrderButtonClick}>
          {
            !orderRequest ? 'Оформить заказ' : 'Отправка...'
          }
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;