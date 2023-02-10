import { orderRequest, orderSuccess, orderFail } from "../slices/orderSlice";
import { SERVER_URL } from "../../utils/constans";
import { clean } from "../slices/constructorSlice";
import checkToken from "../../utils/checkToken";
import { getCookie } from "../../utils/cookie";
import { TypedThunk } from "..";

export const setOrder = (ingredients: Array<string>) : TypedThunk => dispatch => {
  dispatch(orderRequest());
  const cookie = getCookie('accessToken');
  if(cookie !== undefined){
    checkToken(`${SERVER_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
      headers: {
        'Content-Type': 'application/json',
        authorization: cookie,
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
}