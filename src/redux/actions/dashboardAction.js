import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const getDashboard = (token) => async (dispatch) => {
  try {
    const firstLogin = localStorage.getItem("firstLogin");
    dispatch({ type: GLOBALTYPES.DASHBOARD_REQUEST });
    const res = await getDataApi("admin-dashboard", token);
    dispatch({
      type: GLOBALTYPES.DASHBOARD_SUCCESS,
      payload: res.data.data.message,
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.DASHBOARD_FAILURE,
      payload: {
        error: err.message,
      },
    });
  }
};
