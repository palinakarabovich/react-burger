import ingredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <img src={ingredient.image_large} className={ingredientDetailsStyles.img} />
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })
}