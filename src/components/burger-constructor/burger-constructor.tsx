import burgerConstructorStyles from './burger-constructor.module.css'
import { Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { setBun, addIngredient, removeIngredient, clean } from '../../services/slices/constructorSlice';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { setOrder } from '../../services/actions/orderActions';
import React from 'react';
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor.tsx
import { useHistory, useLocation } from 'react-router-dom';
import { TIngredient, DraggableTypes } from '../../types';

const BurgerConstructor = () => {

  const { items, price, bun } = useSelector((store: any): any => store.burgerConstructor);
  const { loggedIn } = useSelector((store: any): any => store.user);
  const { orderRequest, orderSuccess } = useSelector((store: any): any => store.order);
  const [isPlaceholder, setPlaceholder] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
=======
import { useHistory } from 'react-router-dom';

const BurgerConstructor = () => {

  const { items, price, bun } = useSelector((store) => store.burgerConstructor);
  const { loggedIn } = useSelector((store) => store.user);
  const { orderRequest } = useSelector((store) => store.order);
  const [isPlaceholder, setPlaceholder] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
>>>>>>> main:src/components/burger-constructor/burger-constructor.jsx

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
    //@ts-ignore
    orderSuccess && dispatch(clean());
  }, [orderSuccess])

  React.useEffect(() => {
    if (bun !== null) {
      setPlaceholder(false);
    }
  }, [bun])

  const onOrderButtonClick = () => {
    if (!loggedIn) {
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor.tsx
      history.push({ pathname: '/login' });
=======
      history.replace({ pathname: '/login' });
>>>>>>> main:src/components/burger-constructor/burger-constructor.jsx
      return;
    }
    if (bun !== null) {
      history.push({
        pathname: '/',
        state: {
          background: location
        }
      });
      //@ts-ignore
      dispatch(setOrder(
        [].concat(
          items.map((item: TIngredient) => item._id),
          bun._id,
          bun._id
        ))
      );
    } else {
      setPlaceholder(true);
    }
  }

  const handleClose = (index: number) => {
    dispatch(removeIngredient(index));
  }

  return (
    <section className={burgerConstructorStyles.wrapper} ref={dropTarget}>
      <div className={`${burgerConstructorStyles.ingredients} ${bun === null && items.length === 0 ? burgerConstructorStyles.ingredientsEmpty : ''}`} style={{ border }}>
        <div className={burgerConstructorStyles.bun}>
          {bun && <BurgerConstructorElement type='top' ingredient={bun} isLocked={true} />}
        </div>
        <ul className={burgerConstructorStyles.list}>
          {items.length !== 0
<<<<<<< HEAD:src/components/burger-constructor/burger-constructor.tsx
            ? items.map((i: TIngredient, index: number) => {
=======
            ? items.map((i, index) => {
>>>>>>> main:src/components/burger-constructor/burger-constructor.jsx
              if (i.type !== 'bun') {
                return (
                  <li key={i.uuid} className={burgerConstructorStyles.element}>
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