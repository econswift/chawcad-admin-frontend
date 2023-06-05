import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const getUser = (token, perPage, pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.USER_REQUEST });
    const res = await getDataApi(
      `admin-users?page=${pageNumber}&per_page=${perPage}`,
      token
    );
    console.log(pageNumber, perPage);
    dispatch({
      type: GLOBALTYPES.USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.USER_FAILURE,
      payload: {
        error: err.message,
      },
    });
  }
};
