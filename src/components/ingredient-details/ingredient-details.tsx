import { useTypedSelector } from '../../services';
import ingredientDetailsStyles from './ingredient-details.module.css';

const IngredientDetails = () => {

  const { item } = useTypedSelector((store) => store.currentIngredient);

  return (
    <><img src={item?.image_large} className={ingredientDetailsStyles.img} alt={item?.name} />
      <div className={ingredientDetailsStyles.wrapper}>
        <h3 className={ingredientDetailsStyles.name}>{item?.name}</h3>
        <ul className={ingredientDetailsStyles.container}>
          <li className={ingredientDetailsStyles.info}>
            Calories, kcal
            <span className={ingredientDetailsStyles.number}>{item?.calories}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Proteins, g
            <span className={ingredientDetailsStyles.number}>{item?.proteins}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Fats, g
            <span className={ingredientDetailsStyles.number}>{item?.fat}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Carbohydrates, g
            <span className={ingredientDetailsStyles.number}>{item?.carbohydrates}</span>
          </li>
        </ul>
      </div></>

  )
}

export default IngredientDetails;