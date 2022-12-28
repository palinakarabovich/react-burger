import burgerConstructorStyles from './burger-constructor.module.css'
import { Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { setBun, addIngredient, removeIngredient } from '../../services/slices/constructorSlice';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { setOrder } from '../../services/actions/orderActions';
import React from 'react';
import { useHistory } from 'react-router-dom';

const BurgerConstructor = () => {

  const { items, price, bun } = useSelector((store) => store.burgerConstructor);
  const { loggedIn } = useSelector((store) => store.user);
  const { orderRequest } = useSelector((store) => store.order);
  const [isPlaceholder, setPlaceholder] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [{ border }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      dispatch(item.type === 'bun' ? setBun(item) : addIngredient(item))
    },
    collect: monitor => ({
      border: monitor.isOver() ? '2px solid #4C4CFF' : '',
    })
  });

  React.useEffect(() => {
    if (bun !== null) {
      setPlaceholder(false);
    }
  }, [bun])

  const onOrderButtonClick = () => {
    if (!loggedIn) {
      history.replace({ pathname: '/login' });
      return;
    }
    if (bun !== null) {
      dispatch(setOrder(
        [].concat(
          items.map(item => item._id),
          bun._id,
          bun._id
        ))
      );
    } else {
      setPlaceholder(true);
    }
  }

  const handleClose = (index) => {
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
            ? items.map((i, index) => {
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
        <p className={burgerConstructorStyles.price}>{price}<span className={burgerConstructorStyles.currency}><CurrencyIcon /></span></p>
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