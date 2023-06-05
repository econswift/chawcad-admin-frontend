import { GLOBALTYPES } from "../actions/globalTypes";

const initialStore = {
  loading: false,
  user: [],
  error: "",
};

const userReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GLOBALTYPES.USER_REQUEST:
      return {
        ...state,
        user: [],
        loading: true,
      };

    case GLOBALTYPES.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };

    case GLOBALTYPES.USER_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
