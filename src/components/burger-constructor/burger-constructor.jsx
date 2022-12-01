import burgerConstructorStyles from './burger-constructor.module.css'
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';

const BurgerConstructor = ({ chosenIngredients, modalOpen }) => {

  const [priceTotal, setPriceTotal] = React.useState(0);
  const [bun, setBun] = React.useState({});

  React.useState(() => {
    setBun(chosenIngredients.find((i) => i.type === 'bun'));
  }, [])

  React.useState(() => {
    chosenIngredients.forEach((i) => {
      if (i.type === 'bun') {
        return setPriceTotal(p => p + i.price * 2)
      }
      return setPriceTotal(p => p + i.price)
    });
  }, [chosenIngredients]);

  const onOrderButtonClick = () => {
    modalOpen();
  }

  return (
    <section className={burgerConstructorStyles.wrapper}>
      <div className={burgerConstructorStyles.ingredients}>
        <div className={burgerConstructorStyles.bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (вверх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={burgerConstructorStyles.list}>
          {chosenIngredients.map((i, index) => {
            if (i.type !== 'bun') {
              return (
                <li key={`${i._id}${index}`} className={burgerConstructorStyles.element}>
                  <div className={burgerConstructorStyles.dragIcon}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    text={i.name}
                    price={i.price}
                    thumbnail={i.image} />
                </li>)
            }
          }
          )}
        </ul>
        <div className={burgerConstructorStyles.bun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={burgerConstructorStyles.info}>
        <p className={burgerConstructorStyles.price}>{priceTotal}<span className={burgerConstructorStyles.currency}><CurrencyIcon /></span></p>
        <Button htmlType="button" type="primary" size="large" onClick={onOrderButtonClick}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  modalOpen: PropTypes.func
}