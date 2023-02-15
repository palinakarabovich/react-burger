import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory } from 'react-router-dom';
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
import OrdersFeed from '../../pages/orders-feed/orders-feed';
import OrderInfo from '../order-info/order-info';
import Order from '../../pages/order/order';
import { useTypedDispatch, useTypedSelector } from '../../services';

type TLocationTemplate = {
  background?: any;
  openIngredientModal?: boolean;
}

function App() {
  const { itemsSuccess } = useTypedSelector((store) => store.ingredients);
  const dispatch = useTypedDispatch();
  const history = useHistory();
  const location = useLocation<TLocationTemplate>();
  let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;
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
            <Switch location={background || location}>
              <Route exact path='/react-burger'>
                <MainPage />
              </Route>
              <Route exact path='/'>
                <MainPage />
              </Route>
              <ProtectedRoute onlyForAuth exact path='/profile/orders/:id'>
                <Order />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth path='/profile'>
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/login'>
                <Login />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/register'>
                <Register />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/forgot-password'>
                <ForgotPassword />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/reset-password'>
                <ResetPassword />
              </ProtectedRoute>
              <Route exact path='/feed'>
                <OrdersFeed />
              </Route>
              <Route exact path='/ingredients/:id'>
                <Ingredient />
              </Route>
              <Route exact path='/feed/:id'>
                <Order />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          )
        }

        {background || modalWithIngredientWasOpen ?
          (<>
            <Route path='/' exact={true} children={<Modal title=''><OrderDetails /></Modal>} />
            <Route path='/feed/:id' exact={true} children={<Modal title=''><OrderInfo /></Modal>} />
            <Route path='/profile/orders/:id' exact={true} children={<Modal title=''><OrderInfo /></Modal>} />
            <Route path='/ingredients/:id' children={<Modal title='Детали ингредиента'><IngredientDetails /></Modal>} />
          </>) : <></>
        }
      </DndProvider>
    </div>
  );
}

export default App;
