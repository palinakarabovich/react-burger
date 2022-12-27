import { SERVER_URL } from "../../utils/constans";
import { ingredientsSuccess, ingredientsRequest, ingredientsFail } from "../slices/ingredientsSlice";
import checkResponse from "../../utils/checkResponse";

export const getIngredients = () => dispatch => {
  dispatch(ingredientsRequest());
  fetch(`${SERVER_URL}/ingredients`)
    .then(res => checkResponse(res))
    .then((data) => dispatch(ingredientsSuccess(data.data)))
    .catch(() => dispatch(ingredientsFail()));
}