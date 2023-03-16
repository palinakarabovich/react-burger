import { ingredientsSuccess, ingredientsRequest, ingredientsFail } from "../slices/ingredientsSlice";
import { TypedThunk } from "..";
import { SERVER_URL } from "../../utils/constans";
import checkResponse from "../../utils/checkResponse";
import { translateIngredients } from "../../utils/translateImgredients";

export const getIngredients = (): TypedThunk => (dispatch) => {
  dispatch(ingredientsRequest());
  return fetch(`${SERVER_URL}/ingredients`)
    .then(res => checkResponse(res))
    .then((data) => dispatch(ingredientsSuccess(translateIngredients(data.data))))
    .catch(() => dispatch(ingredientsFail()));
}
