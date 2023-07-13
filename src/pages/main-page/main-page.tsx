import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import mainStyles from './main-page.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import React from 'react';
import { getUser } from '../../services/actions/authActions';
import { useTypedDispatch, useTypedSelector } from '../../services';
import { getCurrentDimension } from '../../utils/getCurrentDemention';
import Summary from '../../components/summary/summary';

const MainPage = () => {

  const { loggedIn } = useTypedSelector((store) => store.user);
  const dispatch = useTypedDispatch();
  const [screenSize, setScreenSize] = React.useState(getCurrentDimension());

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const resizeHandler = () => {
    setScreenSize(getCurrentDimension())
  }

  React.useEffect(() => {
    if (!loggedIn && localStorage.getItem('refreshToken')) {
      dispatch(getUser());
    }
  }, [dispatch])

  return (
    <main className={mainStyles.container}>
      <BurgerIngredients />
      {
        screenSize.width > 1100 ? <BurgerConstructor /> : <Summary />
      }
    </main>
  )
}

export default MainPage;