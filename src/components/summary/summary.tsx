import React from 'react'
import summaryStyles from './summary.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../services';
import { useHistory } from 'react-router-dom';

const Summary: React.FC = () => {

  const { price, items, bun} = useTypedSelector((store) => store.burgerConstructor);
  const history = useHistory();

  const onShowOrderClick = () => {
    history.push({pathname: '/react-burger/order-review'})
  }

  return (
    <div className={summaryStyles.summary}>
      <p className={summaryStyles.price}>{price}<span className={summaryStyles.currency}><CurrencyIcon type="primary" /></span></p>
      <Button htmlType="button" type="primary" size="large" onClick={onShowOrderClick} disabled={items.length !== 0 || bun ? false : true}>
        Show order
      </Button>
    </div>
  )
}

export default Summary;