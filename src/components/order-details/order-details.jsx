import orderDatalsStyles from './order-details.module.css'

const OrderDetails = () => {
  return (
    <section className={orderDatalsStyles.section}>
      <p className={orderDatalsStyles.number}>034536</p>
      <p className={orderDatalsStyles.identifier}>идентификатор заказа</p>
      <div className={orderDatalsStyles.icon} />
      <p className={orderDatalsStyles.notification}> Ваш заказ начали готовить</p>
      <p className={orderDatalsStyles.action}>Дождитесь готовности на орбитальной станции</p>
    </section>
  )
}

export default OrderDetails;