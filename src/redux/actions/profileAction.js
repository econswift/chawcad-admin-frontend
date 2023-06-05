import { GLOBALTYPES } from "./globalTypes";
import { postDataApi, getDataApi } from "../../utils/fetchData";

export const profile = (token) => async (dispatch) => {
  try {
    const firstLogin = localStorage.getItem("firstLogin");
    dispatch({ type: GLOBALTYPES.PROFILE_REQUEST });
    const res = await getDataApi("user/profile", token);
    dispatch({
      type: GLOBALTYPES.PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.PROFILE_FAILURE,
      payload: {
        error: err.message,
      },
    });
  }
};
