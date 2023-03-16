import { useTypedSelector } from '../../services';
import Loader from '../loader/loader';
import orderDatalsStyles from './order-details.module.css';

const OrderDetails = () => {

  const { order, orderRequest, orderSuccess } = useTypedSelector((store) => store.order);
  
  return (
    <section className={orderDatalsStyles.section}>
      {
        orderRequest
          ? <Loader />
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