import React from "react";
import { getCurrentDimension } from "../../utils/getCurrentDemention";
import { useHistory } from "react-router-dom";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

const OrderReview = () => {
  const [screenSize, setScreenSize] = React.useState(getCurrentDimension());
  const history = useHistory();

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  React.useEffect(() => {
    console.log('hee')
    if(screenSize.width > 1100){
      history.replace({pathname: '/react-burger'})
    }
  }, [screenSize])

  const resizeHandler = () => {
    setScreenSize(getCurrentDimension())
  }
  return (
    <BurgerConstructor />
  )
}

export default OrderReview;