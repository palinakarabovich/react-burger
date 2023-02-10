import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import mainStyles from './main-page.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import React from 'react';
import { getUser } from '../../services/actions/authActions';
import { useTypedDispatch, useTypedSelector } from '../../services';

const MainPage = () => {

  const { loggedIn } = useTypedSelector((store) => store.user);
  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    if (!loggedIn && localStorage.getItem('refreshToken')) {
      dispatch(getUser());
    }
  }, [dispatch])

  return (
    <main className={mainStyles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  )
}

export default MainPage;