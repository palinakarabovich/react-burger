import { orderRequest, orderSuccess, orderFail } from "../slices/orderSlice";
import { SERVER_URL } from "../../utils/constans";
import checkResponse from "../../utils/checkResponse";
import { clean } from "../slices/constructorSlice";
import checkToken from "../../utils/checkToken";
import { getCookie } from "../../utils/cookie";

export const setOrder = (ingredients) => dispatch => {
  dispatch(orderRequest());
  checkToken(`${SERVER_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: {
      'Content-Type': 'application/json',
      authorization: getCookie('accessToken'),
    }
  })
    .then(data => {
      dispatch(orderSuccess(data))
      dispatch(clean())
    })
    .catch(err => {
      dispatch(orderFail())
    })
}