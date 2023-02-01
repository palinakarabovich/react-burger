import personalOrderInfoStyles from './personal-orders-feed.module.css';
import OrderItem from '../order-item/order-item';
import { useTypedDispatch, useTypedSelector } from '../../services';
import React from 'react';
import { wsActionsAuth, wsAuthInit } from '../../services/slices/ordersAllSlice';
import Loader from '../loader/loader';

const PersonalOrdersInfo = () => {

  const dispatch = useTypedDispatch();

  const orders = useTypedSelector((store) => store.allOrders.ordersAuth);
  const connected = useTypedSelector((store) => store.allOrders.wsConnectedAuth);
  const sortedOrders = [...orders]?.reverse();

  React.useEffect(() => {
    dispatch(wsAuthInit());
    return () => {
      dispatch(wsActionsAuth.onClose)
    }
  }, []);

  return (
    <div className={personalOrderInfoStyles.page}>
      {
        connected && sortedOrders.length !== 0 ?  (
          <ul className={personalOrderInfoStyles.list}>
            {
              sortedOrders.map((order) => {
                return (
                  <li className={personalOrderInfoStyles.order} key={order.number}>
                    <OrderItem order={order} status/>
                  </li>
                )
              })
            }
          </ul>
        )
          : <Loader />
      }
    </div>
  )
}

export default PersonalOrdersInfo;