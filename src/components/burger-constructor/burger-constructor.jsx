import burgerConstructorStyles from './burger-constructor.module.css'
import { Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { setBun, addIngredient, removeIngredient } from '../../services/slices/constructorSlice';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { setOrder } from '../../services/actions/orderActions';
import React from 'react';

const BurgerConstructor = ({ modalOpen }) => {

  const { items, price, bun } = useSelector((store) => store.burgerConstructor);
  const [isPlaceholder, setPlaceholder] = React.useState(false);
  const dispatch = useDispatch();

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
    if (bun !== null) {
      dispatch(setOrder(
        [].concat(
          items.map(item => item._id),
          bun._id,
          bun._id
        ))
      );
      modalOpen();
    } else {
      setPlaceholder(true);
    }
  }

  const handleClose = (index) => {
    dispatch(removeIngredient(index));
  }

  return (
    <section className={burgerConstructorStyles.wrapper} ref={dropTarget}>
      <div className={burgerConstructorStyles.ingredients} style={{ border }}>
        <div className={burgerConstructorStyles.bun}>
          {bun && <BurgerConstructorElement type='top' ingredient={bun} isLocked={true} />}
        </div>
        <ul className={burgerConstructorStyles.list}>
          {items.length !== 0 &&
            items.map((i, index) => {
              if (i.type !== 'bun') {
                return (
                  <li key={ i.uuid } className={burgerConstructorStyles.element}>
                    <div className={burgerConstructorStyles.dragIcon}>
                      <DragIcon type="primary" />
                    </div>
                    <BurgerConstructorElement ingredient={i} index={index} handleClose={() => handleClose(index)} isDrag={true} />
                  </li>)
              }
            }
            )}
        </ul>
        <div className={burgerConstructorStyles.bun}>
          {bun && <BurgerConstructorElement type='bottom' ingredient={bun} isLocked={true} />}
        </div>
        {
          isPlaceholder && <p className={burgerConstructorStyles.error}> ???? ???? ???????????? ???????????????? ???????????? ?????? ?????????????? :(</p>
        }
      </div>
      <div className={burgerConstructorStyles.info}>
        <p className={burgerConstructorStyles.price}>{price}<span className={burgerConstructorStyles.currency}><CurrencyIcon /></span></p>
        <Button htmlType="button" type="primary" size="large" onClick={onOrderButtonClick}>
          ???????????????? ??????????
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  modalOpen: PropTypes.func,
}