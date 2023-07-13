import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementMobileStyles from './constructor-element-mobile.module.css'
import { TIngredient } from '../../types';
import React from 'react';

interface IConsctructorElementMobile {
  ingredient: TIngredient,
  type: "top" | "bottom" | undefined
};


const ConsctructorElementMobile: React.FC<IConsctructorElementMobile> = ({ ingredient, type }) => {
  return (
    <>
      <div className={constructorElementMobileStyles.info}>
        <img className={constructorElementMobileStyles.image} alt={ingredient.name} src={ingredient.image_mobile} />
        <p className={constructorElementMobileStyles.title}>{`${ingredient.name}${type === 'bottom' ? ' (bottom)' : type === 'top' ? ' (top)' : ''}`}</p>
      </div>
      <div className={constructorElementMobileStyles.digits}>
        <p className={constructorElementMobileStyles.price}>{ingredient.price}</p>
        <span className={constructorElementMobileStyles.currency}><CurrencyIcon type="primary" /></span>
      </div>
    </>
  )
}

export default ConsctructorElementMobile;