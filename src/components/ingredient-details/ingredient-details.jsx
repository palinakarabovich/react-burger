import ingredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/constans';

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <img src={ingredient.image_large} className={ingredientDetailsStyles.img} alt={ingredient.name}/>
      <div className={ingredientDetailsStyles.wrapper}>
        <h3 className={ingredientDetailsStyles.name}>{ingredient.name}</h3>
        <ul className={ingredientDetailsStyles.container}>
          <li className={ingredientDetailsStyles.info}>
            Калории,ккал
            <span className={ingredientDetailsStyles.number}>{ingredient.calories}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Белки, г
            <span className={ingredientDetailsStyles.number}>{ingredient.proteins}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Жиры, г
            <span className={ingredientDetailsStyles.number}>{ingredient.fat}</span>
          </li>
          <li className={ingredientDetailsStyles.info}>
            Углеводы, г
            <span className={ingredientDetailsStyles.number}>{ingredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientType)
}