import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { SERVER_URL } from '../../utils/constans';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import ingredients from '../../assets/data';

function App() {
  const [data, setData] = React.useState({});
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] = React.useState({ visibility: false, content: null });
  const [isOrderModalOpen, setOrderModalOpen] = React.useState({ visibility: false, content: null });

  React.useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [])

  const handleIngredientClick = (ingredient) => {
    setIngredientDetailsModalOpen({ visibility: true, content: ingredient });
  }

  const handleOrderButtonClick = () => {
    setOrderModalOpen({ visibility: true, content: null });
  }

  const handleCloseModalClick = () => {
    setIngredientDetailsModalOpen({ visibility: false, content: null });
    setOrderModalOpen({ visibility: false, content: null });
  }

  return (
    <><div className={appStyles.app}>
      <AppHeader />
      <div className={appStyles.container}>
        <BurgerIngredients data={data} modalOpen={handleIngredientClick} chosenIngredients={ingredients} />
        <BurgerConstructor chosenIngredients={ingredients} modalOpen={handleOrderButtonClick} />
      </div>
    </div><>
        {isIngredientDetailsModalOpen.visibility &&
          <Modal onClose={handleCloseModalClick} title='Детали ингредиента'>
            <IngredientDetails ingredient={isIngredientDetailsModalOpen.content} />
          </Modal>}
      </>
      <>
        {isOrderModalOpen.visibility &&
          <Modal onClose={handleCloseModalClick} title=''>
            <OrderDetails />
          </Modal>}
      </>
    </>
  );
}

export default App;
