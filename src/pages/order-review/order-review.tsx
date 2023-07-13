import React from "react";
import { getCurrentDimension } from "../../utils/getCurrentDemention";
import { Redirect, useHistory } from "react-router-dom";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useTypedSelector } from "../../services";

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
    if(screenSize.width > 1100){
      history.replace({pathname: '/react-burger'})
    }
  }, [screenSize])

  const resizeHandler = () => {
    setScreenSize(getCurrentDimension())
  }
  return (
    <>
    {
      price !== 0 || orderSuccess
      ? <BurgerConstructor />
      : <Redirect to='/react-burger' />
    }
    </>
  )
}

export default OrderReview;