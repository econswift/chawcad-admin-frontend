import { GLOBALTYPES } from "./globalTypes";
import { putDataApi, deleteDataApi } from "../../utils/fetchData";

export const postDocument = (token, id, file) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    // dispatch({
    //   type: GLOBALTYPES.CREATE_POST,
    // });

    const res = await putDataApi(
      `admin-user-documents/${id}`,
      { file: file },
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

export const toggleActivation =
  (token, id, systemVerification, nationalVerification, active) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      const res = await putDataApi(
        `admin-users/${id}`,
        {
          system_verification: systemVerification,
          national_verification: nationalVerification,
          active: active,
        },
        token
      );

      dispatch({
        type: GLOBALTYPES.POST_SUCCESS,
        payload: res,
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.data.message,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.POST_FAILURE,
        payload: {
          error: err.message,
        },
      });
    }
  };

export const deleteDocument = (file, token) => async (dispatch) => {
  dispatch({ type: GLOBALTYPES.DELETE_POST, payload: file });
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await deleteDataApi(`admin-user-documents/${file.id}`, token);

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
