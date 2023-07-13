import React from "react";
import { getCurrentDimension } from "../../utils/getCurrentDemention";
import { Redirect, useHistory } from "react-router-dom";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useTypedSelector } from "../../services";
import orderReviewStyles from './order-review.module.css'
import { ArrowDownIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderReview = () => {
  const [screenSize, setScreenSize] = React.useState(getCurrentDimension());
  const history = useHistory();

  const { price } = useTypedSelector((store) => store.burgerConstructor);
  const { orderSuccess } = useTypedSelector((store) => store.order);

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  React.useEffect(() => {
    if (screenSize.width > 1100) {
      history.replace({ pathname: '/react-burger' })
    }
  }, [screenSize])

  const resizeHandler = () => {
    setScreenSize(getCurrentDimension())
  }

  const handleBackClick = () => {
    history.push({ pathname: '/react-burger' })
  }

  return (
    <div className={orderReviewStyles.container}>
      <div className={orderReviewStyles.buttons_group}>
        <div className={orderReviewStyles.icon}>
          <ArrowDownIcon type="secondary" />
        </div>
        <button className={orderReviewStyles.button} onClick={handleBackClick}>
          Back
        </button>
      </div>
      <h2 className={orderReviewStyles.title}>Your order</h2>
      {
        price !== 0 || orderSuccess
          ? <BurgerConstructor />
          : <Redirect to='/react-burger' />
      }
    </div>
  )
}

export default OrderReview;