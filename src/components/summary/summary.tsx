import React from 'react'
import summaryStyles from './summary.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useTypedSelector } from '../../services';

const Summary: React.FC = () => {

  const { price} = useTypedSelector((store) => store.burgerConstructor);

  return (
    <div className={summaryStyles.summary}>
      <p className={summaryStyles.price}>{price}<span className={summaryStyles.currency}><CurrencyIcon type="primary" /></span></p>
      <Button htmlType="button" type="primary" size="large" >
        Show order
      </Button>
    </div>
  )
}

export default Summary;