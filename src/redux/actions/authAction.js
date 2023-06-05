import { GLOBALTYPES } from "./globalTypes";
import { postDataApi, getDataApi } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataApi("user/login", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: `Bearer ${res.data.token}`,
      },
    });

    localStorage.setItem("firstLogin", `Bearer ${res.data.token}`);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: "You have logged in successfully",
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.errors.root,
        emptyInput: err.response.data.errors,
      },
    });
  }
};

//   () =>
//   async (dispatch) => {
//     try {
//       // dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
//       const res = await getDataApi("user/profile", auth.token);
//       dispatch({
//         type: GLOBALTYPES.AUTH,
//         payload: {
//           user: res.data,
//         },
//       });

//       console.log(auth.token);

//       // localStorage.setItem("firstLogin", true);
//       // dispatch({
//       //   type: GLOBALTYPES.ALERT,
//       //   payload: {
//       //     success: "You have logged in successfully",
//       //   },
//       // });
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: {
//           error: err,
//         },
//       });
//     }
//   };

export const refreshToken = (token) => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");

  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await getDataApi("user/refresh-token", firstLogin);
      localStorage.setItem("firstLogin", `Bearer ${res.data.token}`);
      await dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: `Bearer ${res.data.token}`,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.errors,
        },
      });
    }
  }
};

// export const logout = () => async (dispatch) => {
//   try {
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
//     localStorage.removeItem("firstLogin");
//     await postDataApi("user/logout");
//     dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
//     window.location.href = "/";
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: err.response.data.message,
//       },
//     });
//     console.log(err);
//   }
// };
