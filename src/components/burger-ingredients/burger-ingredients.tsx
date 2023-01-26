import burgerIngredientsStyles from './burger-ingredients.module.css'
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list'
import React from 'react';
import { useSelector } from 'react-redux';
import { TIngredient, IngredientType } from '../../types';

interface ITypes {
  name: string;
  type: IngredientType;
}

const types: Array<ITypes> = [{ name: 'Булки', type: IngredientType.bun }, { name: 'Соусы', type: IngredientType.sauce }, { name: 'Начинки', type: IngredientType.main }];

const BurgerIngredients = () => {
  const { items } = useSelector((store: any): any => store.ingredients);
  const [selectedCategory, setSelectedcategory] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const bunsRef = React.useRef<HTMLHeadingElement>(null);
  const sauceRef = React.useRef<HTMLHeadingElement>(null);
  const mainRef = React.useRef<HTMLHeadingElement>(null);

  const bunsItems = React.useMemo(() => items.filter((i: TIngredient) => i.type === types[0].type), [items]);
  const saucesItems = React.useMemo(() => items.filter((i: TIngredient) => i.type === types[1].type), [items]);
  const mainItems = React.useMemo(() => items.filter((i: TIngredient) => i.type === types[2].type), [items]);

  const handleScroll = () => {
    if (containerRef.current !== null && bunsRef.current !== null && sauceRef.current !== null && mainRef.current !== null) {
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
  }

  const scrollToCategory = (category: number) => {
    if (containerRef.current !== null && bunsRef.current !== null && sauceRef.current !== null && mainRef.current !== null) {
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
            <BurgerIngredientsList ref={bunsRef} title={types[0].name} ingredients={bunsItems} />
            <BurgerIngredientsList ref={sauceRef} title={types[1].name} ingredients={saucesItems} />
            <BurgerIngredientsList ref={mainRef} title={types[2].name} ingredients={mainItems} />
          </div>
        )
      }
    </section >
  )
}

export default BurgerIngredients;