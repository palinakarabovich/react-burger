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
      history.push({ pathname: '/react-burger/login' });
      return;
    }
    if (bun !== null) {
      history.push({
        pathname: '/react-burger/',
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
    <div className={burgerConstructorStyles.wrapper} ref={dropTarget}>
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
            && <p className={burgerConstructorStyles.placeholder}>Drag the ingredients here</p>}
        </ul>
        <div className={burgerConstructorStyles.bun}>
          {bun && <BurgerConstructorElement type='bottom' ingredient={bun} isLocked={true} />}
        </div>
        {
          isPlaceholder && <p className={burgerConstructorStyles.error}> You can not make a burger without a bun :(</p>
        }
      </div>
      <div className={burgerConstructorStyles.info}>
        <div className={burgerConstructorStyles.digits}>
          <p className={burgerConstructorStyles.price}>{price}</p>
          <div className={burgerConstructorStyles.currency}><CurrencyIcon type="primary" /></div>
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onOrderButtonClick}>
          {
            !orderRequest ? 'Place order' : 'Saving...'
          }
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;