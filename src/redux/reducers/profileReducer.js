import { GLOBALTYPES } from "../actions/globalTypes";

const initialStore = {
  loading: false,
  profile: [],
  error: "",
};

const profileReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GLOBALTYPES.PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GLOBALTYPES.PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        error: "",
      };

    case GLOBALTYPES.PROFILE_FAILURE:
      return {
        loading: false,
        profile: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
