import OrderItem from '../../components/order-item/order-item';
import orderFeedStyles from './orders-feed.module.css';
import { useTypedDispatch, useTypedSelector } from '../../services';
import React from 'react';
import { wsInit, wsActions } from '../../services/slices/ordersAllSlice';
import { IOrder } from '../../types';
import Loader from '../../components/loader/loader';
import { getCurrentDimension } from '../../utils/getCurrentDemention';

const OrdersFeed = () => {
  const dispatch = useTypedDispatch();
  const orders = useTypedSelector((store) => store.allOrders.orders);
  const ordersSuccess = orders.filter((order) => order.status === 'done');
  const ordersCreated = orders.filter((order) => order.status === 'created');

  const total = useTypedSelector((store) => store.allOrders.total);
  const totalToday = useTypedSelector((store) => store.allOrders.totalToday);
  const connected = useTypedSelector((store) => store.allOrders.wsConnected);

  React.useEffect(() => {
    dispatch(wsInit());
    return () => {
      dispatch(wsActions.onClose());
    }
  }, []);

  return (
    <div className={orderFeedStyles.page}>
      <h2 className={orderFeedStyles.title}>Real-time order feed</h2>
      {
        connected ?
          (
            <section className={orderFeedStyles.section}>
              <ul className={orderFeedStyles.orderList}>
                {orders.map((o: IOrder) => (
                  <li key={o.number} className={orderFeedStyles.order}><OrderItem order={o} status={false} /></li>
                ))}
              </ul>
              <div className={orderFeedStyles.container}>
                <div className={orderFeedStyles.orders}>
                  <div className={orderFeedStyles.block}>
                    <p className={orderFeedStyles.ordersTitle}>Ready:</p>
                    <ul className={orderFeedStyles.numberList}>
                      {
                        ordersSuccess.map((order) => {
                          return (<li className={orderFeedStyles.number} style={{ color: '#00CCCC' }} key={order.number}>{order.number}</li>)
                        })
                      }
                    </ul>
                  </div>
                  <div className={orderFeedStyles.block}>
                    <p className={orderFeedStyles.ordersTitle}>Preparing:</p>
                    <ul className={orderFeedStyles.numberList}>
                      {
                        ordersCreated.map((order) => {
                          return (<li className={orderFeedStyles.number} key={order.number}>{order.number}</li>)
                        })
                      }
                    </ul>
                  </div>
                </div>
                <div className={orderFeedStyles.summarize}>
                  <p className={orderFeedStyles.total}>Total burgers made:</p>
                  <p className={orderFeedStyles.sum}>{total}</p>
                </div>
                <div className={orderFeedStyles.summarize}>
                  <p className={orderFeedStyles.total}>Burgers made today:</p>
                  <p className={orderFeedStyles.sum}>{totalToday}</p>
                </div>
              </div>
            </section>
          )
          : <Loader />
      }
    </div>
  )
};

export default OrdersFeed;