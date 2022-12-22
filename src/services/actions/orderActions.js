import { orderRequest, orderSuccess, orderFail } from "../slices/orderSlice";
import { SERVER_URL } from "../../utils/constans";
import checkResponse from "../../utils/checkResponse";
import { clean } from "../slices/constructorSlice";

export const setOrder = (ingredients) => dispatch => {
  dispatch(orderRequest());
  fetch(`${SERVER_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({ingredients}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => checkResponse(res))
  .then(data => {
    dispatch(orderSuccess(data))
    dispatch(clean())
  })
  .catch(err => {
    dispatch(orderFail())
  })
}