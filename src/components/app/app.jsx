import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route } from 'react-router-dom';
import Profile from '../../pages/profile/profile';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import Ingredient from '../../pages/ingredient/ingredient';
import { useLocation } from 'react-router-dom';
import NotFound from '../../pages/not-found/not-found';
import ProtectedRoute from '../protected-route/protected-route';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import MainPage from '../../pages/main-page/main-page';

function App() {
  const { itemsSuccess } = useSelector((store) => store.ingredients);
  const { orderModalOpen } = useSelector((store) => store.order);
  const dispatch = useDispatch();
  const location = useLocation();

  const modalWithIngredientWasOpen = location.state?.openIngredientModal;

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        {itemsSuccess
          && (
            <Switch>
              <ProtectedRoute exact path='/profile'>
                <Profile type={'user'} />
              </ProtectedRoute>
              <ProtectedRoute exact path='/orders'>
                <Profile type={'orders'} />
              </ProtectedRoute>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/forgot-password'>
                <ForgotPassword />
              </Route>
              <Route exact path='/reset-password'>
                <ResetPassword />
              </Route>
              <Route exact path='/order-feed' />
              <Route exact path='/ingredients/:id'>
                <Ingredient />
              </Route>
              <Route exact path='/'>
                <MainPage />

              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          )
        }
        {modalWithIngredientWasOpen &&
          <Modal title='Детали ингредиента'>
            <IngredientDetails />
          </Modal>
        }
        {orderModalOpen &&
          <Modal title=''>
            <OrderDetails />
          </Modal>}
      </DndProvider>
    </div>
  );
}

export default App;
