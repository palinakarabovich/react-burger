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
            Калории,ккал
            <span className={ingredientDetailsStyles.number}>{item?.calories}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Белки, г
            <span className={ingredientDetailsStyles.number}>{item?.proteins}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Жиры, г
            <span className={ingredientDetailsStyles.number}>{item?.fat}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Углеводы, г
            <span className={ingredientDetailsStyles.number}>{item?.carbohydrates}</span>
          </li>
        </ul>
      </div></>

  )
}

export default IngredientDetails;