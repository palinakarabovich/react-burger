import { SERVER_URL } from "../../utils/constans";
import { ingredientsSuccess, ingredientsRequest, ingredientsFail } from "../slices/ingredientsSlice";
import checkResponse from "../../utils/checkResponse";
import { TypedThunk } from "..";

export const getIngredients = () : TypedThunk => (dispatch) => {
  dispatch(ingredientsRequest());
  fetch(`${SERVER_URL}/ingredients`)
    .then(res => checkResponse(res))
    .then((data) => dispatch(ingredientsSuccess(data.data)))
    .catch(() => dispatch(ingredientsFail()));
}