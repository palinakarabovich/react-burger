import React from 'react';
import { useTypedSelector } from '../../services';
import Loader from '../loader/loader';
import orderDatalsStyles from './order-details.module.css';
import { ORDER_WAITING_TIME_WARNINGS } from '../../utils/constans';
import { getRandomNumber } from '../../utils/getRandomNumber';

const OrderDetails = () => {

  const { order, orderRequest, orderSuccess } = useTypedSelector((store) => store.order);
  const [warning, setWarning] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
        setWarning(getRandomNumber(ORDER_WAITING_TIME_WARNINGS.length))
    }, 4000)
    return () => {
      clearInterval(timer)
    }
  }, [orderRequest])

  return (
    <section className={orderDatalsStyles.section}>
      {
        orderRequest
          ?
          <div className={orderDatalsStyles.info}>
            <p className={orderDatalsStyles.warning}>
              {ORDER_WAITING_TIME_WARNINGS[warning]}
            </p>
            <Loader />
          </div>

          : orderSuccess
          && (
            <>
              <p className={orderDatalsStyles.number}>{order?.order.number}</p>
              <p className={orderDatalsStyles.identifier}>order number</p>
              <div className={orderDatalsStyles.icon} />
              <p className={orderDatalsStyles.notification}> We are preparing your order</p>
              <p className={orderDatalsStyles.action}>Wait at the orbital station</p>
            </>
          )
      }

    </section>
  )
}

export default OrderDetails;