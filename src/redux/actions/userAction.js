import { GLOBALTYPES } from "./globalTypes";
import { getDataApi } from "../../utils/fetchData";

export const getUser =
  (token, perPage, pageNumber, search) => async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.USER_REQUEST });
      const res = await getDataApi(
        `admin-users?page=${pageNumber}&per_page=${perPage}&search=${search}`,
        token
      );

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

export const getOneUser = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.USER_REQUEST });
    const res = await getDataApi(`admin-users/${id}`, token);

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

export const getAdmin = (token, search) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.USER_REQUEST });
    const res = await getDataApi(`admins?search=${search}`, token);
    dispatch({
      type: GLOBALTYPES.USER_SUCCESS,
      payload: res.data.data.message,
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

export const getOneAdmin = (token, id) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.USER_REQUEST });
    const res = await getDataApi(`admins/${id}`, token);

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
