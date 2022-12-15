import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import React from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';
import { useSelector } from 'react-redux';

const types = [{ name: 'Булки', type: 'bun' }, { name: 'Соусы', type: 'sauce' }, { name: 'Начинки', type: 'main' }];

const BurgerIngredients = ({ modalOpen }) => {
  const { items } = useSelector((store) => store.ingredients);
  const [selectedCategory, setSelectedcategory] = React.useState(0);

  const containerRef = React.useRef();
  const bunsRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();

  const bunsItems = React.useMemo(() => items.filter(i => i.type === types[0].type), [items]);
  const saucesItems = React.useMemo(() => items.filter(i => i.type === types[1].type), [items]);
  const mainItems = React.useMemo(() => items.filter(i => i.type === types[2].type), [items]);

  const handleScroll = () => {
    const bunDistance = Math.abs(containerRef.current.getBoundingClientRect().top - bunsRef.current.getBoundingClientRect().top)
    const sauceDistance = Math.abs(containerRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top)
    const mainDistance = Math.abs(containerRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
    const distances = [bunDistance, sauceDistance, mainDistance];
    const minElement = Math.min(...distances);
    const minIndex = distances.findIndex(e => e === minElement);
    if (minIndex !== selectedCategory) {
      setSelectedcategory(minIndex);
    }
  }

  const scrollToCategory = (category) => {
    setSelectedcategory(category);
    switch (category) {
      case 0:
        bunsRef.current.scrollIntoView();
        break
      case 1:
        sauceRef.current.scrollIntoView();
        break
      case 2:
        mainRef.current.scrollIntoView();
        break
      default:
        console.error('Error');
    }
  }

  return (
    <section className={burgerIngredientsStyles.wrapper}>
      <h2 className={burgerIngredientsStyles.title}>Соберите бургер</h2>
      <ul className={burgerIngredientsStyles.sort}>
        {
          types.map((t, index) => (<li onClick={() => scrollToCategory(index)} className={`${burgerIngredientsStyles.sortType} ${selectedCategory === index && burgerIngredientsStyles.sortTypeActive}`} key={index}>{t.name}</li>))
        }
      </ul>
      {
        bunsItems.length !== 0 && saucesItems.length !== 0 && mainItems.length !== 0
        && (
          <div className={burgerIngredientsStyles.container} ref={containerRef} onScroll={handleScroll}>
            <BurgerIngredientsList ref={bunsRef} title={types[0].name} ingredients={bunsItems} modalOpen={modalOpen} />
            <BurgerIngredientsList ref={sauceRef} title={types[1].name} ingredients={saucesItems} modalOpen={modalOpen} />
            <BurgerIngredientsList ref={mainRef} title={types[2].name} ingredients={mainItems} modalOpen={modalOpen} />
          </div>
        )
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
  modalOpen: PropTypes.func
}