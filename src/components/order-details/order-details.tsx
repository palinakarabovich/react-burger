import { useSelector } from 'react-redux';
import Loader from '../loader/loader';
import orderDatalsStyles from './order-details.module.css'

const OrderDetails = () => {

  const { order, orderRequest, orderSuccess } = useSelector((store: any): any => store.order);

  return (
    <section className={orderDatalsStyles.section}>
      {
        orderRequest
          ? <Loader />
          : orderSuccess
          && (
            <>
              <p className={orderDatalsStyles.number}>{order.order.number}</p>
              <p className={orderDatalsStyles.identifier}>идентификатор заказа</p>
              <div className={orderDatalsStyles.icon} />
              <p className={orderDatalsStyles.notification}> Ваш заказ начали готовить</p>
              <p className={orderDatalsStyles.action}>Дождитесь готовности на орбитальной станции</p>
            </>
          )
      }

    </section>
  )
}

export default OrderDetails;