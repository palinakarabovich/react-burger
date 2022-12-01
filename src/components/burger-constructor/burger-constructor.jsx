import burgerConstructorStyles from './burger-constructor.module.css'
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ chosenIngredients, modalOpen }) => {

  const [priceTotal, setPriceTotal] = React.useState(0);

  React.useState(() => {
    chosenIngredients.forEach((i) => {
      return setPriceTotal(p => p + i.price)
    });
  }, [chosenIngredients]);

  const onOrderButtonClick = () => {
    modalOpen();
  }

  return (
    <section className={burgerConstructorStyles.wrapper}>
      <ul className={burgerConstructorStyles.list}>
        {chosenIngredients.map((i, index) => (
          <li key={`${i._id}${index}`} className={burgerConstructorStyles.element}><div className={burgerConstructorStyles.dragIcon}><DragIcon type="primary" /></div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={i.name}
              price={i.price}
              thumbnail={i.image} /></li>
        ))}
      </ul><div className={burgerConstructorStyles.info}>
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
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })),
  modalOpen: PropTypes.func
}