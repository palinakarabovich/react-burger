import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderItemStyles from './order-item.module.css';
import { TIngredient } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { countPrice, getIngredients } from '../../utils/ingredients';
import { maxIngredientsShowed } from '../../utils/constans';
import { IOrder } from '../../types';
import { useLocation, Link } from 'react-router-dom';
import { addOrder } from '../../services/slices/orderInfoSlice';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { getTimeFromTimestamp } from '../../utils/getTimeFromTimestamp';

interface IOrderProps {
  order: IOrder;
  status: boolean;
}

const OrderItem: React.FunctionComponent<IOrderProps> = ({ order, status }) => {

  const { items } = useTypedSelector((store) => store.ingredients);

  const location = useLocation();
  const dispatch = useTypedDispatch();

  const chosenIngredients = getIngredients(order.ingredients, items)
  const visiableIngredients = chosenIngredients.slice(0, maxIngredientsShowed + 1);
  const price: number = countPrice(chosenIngredients);
  const bun = chosenIngredients.find((i) => i.type === 'bun');

  const showOrderDetails = (order: IOrder) => {
    dispatch(addOrder(order));
  }

  return (
    <Link to={{
      pathname: `${location.pathname === '/react-burger/feed' ? `/react-burger/feed/${order._id}` : `/react-burger/profile/orders/${order._id}`}`,
      state: { background: location, openIngredientModal: true }
    }} className={orderItemStyles.link} onClick={() => showOrderDetails(order)}>
      <article className={orderItemStyles.item}>
        <div className={orderItemStyles.description}>
          <p className={orderItemStyles.number}>#{order.number}</p>
          <p className={orderItemStyles.date}>{getTimeFromTimestamp(order.createdAt)}</p>
        </div>
        <h3 className={orderItemStyles.title} style={status ? { marginBottom: 0 } : { marginBottom: 24 }}>{order.name}</h3>
        {
          status && (
            <p className={orderItemStyles.status} style={order.status === 'done' ? { color: '#00CCCC' } : order.status === 'done' ? { color: '#F2F2F3' } : { color: 'FF0000' }}>
              {order.status === 'done' ? 'Ready' : order.status === 'done' ? 'Preparing' : 'Cancled'}
            </p>
          )
        }
        <div className={orderItemStyles.info}>
          <ul className={orderItemStyles.list}>
            <li key={uuidv4()} className={orderItemStyles.ingredient} style={{ zIndex: 6 }}>
              <img src={bun?.image} alt={bun?.name} className={orderItemStyles.image} style={{ opacity: 0.6 }} />
            </li>
            {
              visiableIngredients.map((i: TIngredient, index: number) => {
                if (index < maxIngredientsShowed && i.type !== 'bun') {
                  return <li key={uuidv4()} className={orderItemStyles.ingredient} style={{ zIndex: maxIngredientsShowed - index }}><img src={i.image} alt={i.name} className={orderItemStyles.image} /></li>
                } else if (index === maxIngredientsShowed && chosenIngredients.length === 6 && i.type !== 'bun') {
                  return <li key={uuidv4()} className={orderItemStyles.ingredient} style={{ zIndex: maxIngredientsShowed - index }}><img src={i.image} alt={i.name} className={orderItemStyles.image} /></li>
                } else if (i.type !== 'bun') {
                  return <li key={uuidv4()} className={orderItemStyles.ingredient} style={{ zIndex: maxIngredientsShowed - index }}>
                    <img src={i?.image} alt={i?.name} className={orderItemStyles.image} style={{ opacity: 0.6 }} />
                    <p className={orderItemStyles.rest}>+{chosenIngredients.length - maxIngredientsShowed}</p>
                  </li>
                }
              })
            }
          </ul>
          <div className={orderItemStyles.sum}><p className={orderItemStyles.price}>{price}<span className={orderItemStyles.icon}><CurrencyIcon type="primary" /></span></p></div>
        </div>
      </article>
    </Link>
  )
}

export default OrderItem;