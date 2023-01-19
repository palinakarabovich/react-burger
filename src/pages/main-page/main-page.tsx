import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import mainStyles from './main-page.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getUser } from '../../services/actions/authActions';

const MainPage = () => {

  const { loggedIn } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!loggedIn && localStorage.getItem('refreshToken')) {
      //@ts-ignore
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