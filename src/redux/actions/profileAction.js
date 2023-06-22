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

export const passwordChange =
  (token, oldPassword, newPassword) => async (dispatch) => {
    console.log(oldPassword, newPassword);
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await postDataApi(
        `user/change/password`,
        {
          current_password: oldPassword,
          password: newPassword,
        },
        token
      );

      dispatch({
        type: GLOBALTYPES.POST_SUCCESS,
        payload: res,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.data.message,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.message,
          emptyInput: err.response.data.errors,
        },
      });
    }
  };
