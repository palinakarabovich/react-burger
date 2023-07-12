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
import OrderReview from '../../pages/order-review/order-review';
import './custom_styles_for_ux-library.css'

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
              <Route exact path='/react-burger/order-review'>
               <OrderReview />
              </Route>
              <ProtectedRoute onlyForAuth exact path='/react-burger/profile/orders/:id'>
                <Order />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth path='/react-burger/profile'>
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/react-burger/login'>
                <Login />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/react-burger/register'>
                <Register />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/react-burger/forgot-password'>
                <ForgotPassword />
              </ProtectedRoute>
              <ProtectedRoute onlyForAuth={false} exact path='/react-burger/reset-password'>
                <ResetPassword />
              </ProtectedRoute>
              <Route exact path='/react-burger/feed'>
                <OrdersFeed />
              </Route>
              <Route exact path='/react-burger/ingredients/:id'>
                <Ingredient />
              </Route>
              <Route exact path='/react-burger/feed/:id'>
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
            <Route path='/react-burger/' exact={true} children={<Modal title=''><OrderDetails /></Modal>} />
            <Route path='/react-burger/feed/:id' exact={true} children={<Modal title=''><OrderInfo /></Modal>} />
            <Route path='/react-burger/profile/orders/:id' exact={true} children={<Modal title=''><OrderInfo /></Modal>} />
            <Route path='/react-burger/ingredients/:id' children={<Modal title='Ingredient information'><IngredientDetails /></Modal>} />
          </>) : <></>
        }
      </DndProvider>
    </div>
  );
}

export default App;
