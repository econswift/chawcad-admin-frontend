import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const getTransaction =
  (token, status, show, pageNumber, id, amount, title, search) =>
  async (dispatch) => {
    console.log(status, show, pageNumber, id, amount, title, search);
    try {
      const firstLogin = localStorage.getItem("firstLogin");
      dispatch({ type: GLOBALTYPES.TRANSACTION_REQUEST });

      const res = await getDataApi(
        `admin-transactions?page=${pageNumber}&status=${show}&per_page=${status}&amount=${amount}&id=${id}&title=${title}&search=${search}`,
        token
      );

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
