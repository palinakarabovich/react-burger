import React from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import ingredients from '../../assets/data';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, removeIngredient } from '../../services/slices/ingredientDetailsSlice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [isIngredientDetailsModalOpen, setIngredientDetailsModalOpen] = React.useState({ visibility: false });
  const [isOrderModalOpen, setOrderModalOpen] = React.useState({ visibility: false, content: null });
  const { itemsSuccess } = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  const handleIngredientClick = (ingredient) => {
    dispatch(addIngredient(ingredient));
    setIngredientDetailsModalOpen({ visibility: true });
  }

  const handleOrderButtonClick = () => {
    setOrderModalOpen({ visibility: true, content: null });
  }

  const handleCloseModalClick = () => {
    dispatch(removeIngredient());
    setIngredientDetailsModalOpen({ visibility: false });
    setOrderModalOpen({ visibility: false, content: null });
  }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {
        itemsSuccess
        && (
          <main className={appStyles.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients modalOpen={handleIngredientClick} chosenIngredients={ingredients} />
              <BurgerConstructor chosenIngredients={ingredients} modalOpen={handleOrderButtonClick} />
            </DndProvider>
          </main>
        )
      }
      {isIngredientDetailsModalOpen.visibility &&
        <Modal onClose={handleCloseModalClick} title='Детали ингредиента'>
          <IngredientDetails />
        </Modal>}
      {isOrderModalOpen.visibility &&
        <Modal onClose={handleCloseModalClick} title=''>
          <OrderDetails />
        </Modal>}
    </div>
  );
}

export default App;
