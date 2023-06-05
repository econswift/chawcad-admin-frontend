import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const getTransaction =
  (token, status, show, pageNumber, id, amount, title) => async (dispatch) => {
    try {
      // const title = "Credit Wallet Transaction";
      // const id = "99502c05-b71f-4002-8f96-b743d85a91ca";
      // const amount = 0;
      const firstLogin = localStorage.getItem("firstLogin");
      dispatch({ type: GLOBALTYPES.TRANSACTION_REQUEST });
      const res = await getDataApi(
        `admin-transactions?page=${pageNumber}&status=${show}&per_page=${status}&amount=${amount}&id=${id}&title=${title}`,
        token
      );
      console.log(status, show, pageNumber, id, amount, title);
      console.log(res.request.responseURL);
      dispatch({
        type: GLOBALTYPES.TRANSACTION_SUCCESS,
        payload: { ...res.data, status: show, pageNumber: pageNumber },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.TRANSACTION_FAILURE,
        payload: {
          error: err.message,
        },
      });
    }
  };
