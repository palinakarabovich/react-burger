import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/loader';
import { ingredientType } from '../../utils/constans';

const types = [{ name: 'Булки', type: 'bun' }, { name: 'Соусы', type: 'sauce' }, { name: 'Начинки', type: 'main' }];

const BurgerIngredients = ({ data, chosenIngredients, modalOpen }) => {

  const [selectedCategory, setSelectedcategory] = React.useState(0);
  const [sortedIngredients, setSortedIngredients] = React.useState([]);
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!dataLoading) {
      setSortedIngredients(data.data.filter((i) => i.type === types[selectedCategory].type));
    }
  }, [selectedCategory, dataLoading])

  React.useEffect(() => {
    if (data.success) {
      setDataLoading(false);
    }
  }, [data])

  return (

    <section className={burgerIngredientsStyles.wrapper}>
      <h2 className={burgerIngredientsStyles.title}>Соберите бургер</h2>
      {
        !dataLoading
          ? (<>
            <ul className={burgerIngredientsStyles.sort}>
              {
                types.map((t, index) => (<li onClick={() => setSelectedcategory(index)} className={`${burgerIngredientsStyles.sortType} ${selectedCategory === index && burgerIngredientsStyles.sortTypeActive}`} key={index}>{t.name}</li>))
              }
            </ul>
            <div className={burgerIngredientsStyles.container}>
              <BurgerIngredientsList title={types[selectedCategory].name} ingredients={sortedIngredients} modalOpen={modalOpen} chosenIngredients={chosenIngredients} />
            </div>
          </>)
          : <Loader />
      }
    </section >
  )
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape(ingredientType))
  }),
  chosenIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  modalOpen: PropTypes.func
}