import { GLOBALTYPES } from "./globalTypes";
import { putDataApi } from "../../utils/fetchData";

export const postDocument = (token, id, file) => async (dispatch) => {
  console.log(token, id, file);

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

    // dispatch({
    //   type: GLOBALTYPES.CREATE_POST,
    //   payload: { ...res.data.newPost },
    // });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.POST_FAILURE,
      payload: {
        error: err,
      },
    });
  }
};

export const toggleActivation = (token, id, switch2) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await putDataApi(
      `admin-users/${id}`,
      { system_verification: switch2 },
      token
    );

    dispatch({
      type: GLOBALTYPES.POST_SUCCESS,
      payload: res,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.POST_FAILURE,
      payload: {
        error: err.message,
      },
    });
  }
};
