import React from 'react'
import { useParams } from 'react-router-dom'
import orderStyles from './order.module.css';
import { IOrder } from '../../types'
import { addOrder } from '../../services/slices/orderInfoSlice';
import OrderInfo from '../../components/order-info/order-info';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { wsActions, wsInit } from '../../services/slices/ordersAllSlice';

const Order = () => {
  const params = useParams<{ id?: string }>();
  const orders = useTypedSelector((store) => store.allOrders.orders);
  const currentOrder = orders.find((el: IOrder) => el._id === params.id);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(wsInit());
    return () => {
      dispatch(wsActions.onClose)
    }
  }, [])

  React.useEffect(() => {
    if (currentOrder !== undefined)
    dispatch(addOrder(currentOrder));
  }, [orders]);

  return (
    <div className={orderStyles.container}>
      {orders.length !== 0 && <OrderInfo />}
    </div>
  )
}

export default Order;