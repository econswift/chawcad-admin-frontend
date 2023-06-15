import { GLOBALTYPES } from "../actions/globalTypes";

const initialStore = {
  loading: false,
  post: [],
  error: "",
};

const postReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GLOBALTYPES.CREATE_POST:
      return {
        ...state,
        post: [action.payload, ...state.post],
        loading: true,
      };

    case GLOBALTYPES.POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        error: "",
      };

    case GLOBALTYPES.POST_FAILURE:
      return {
        loading: false,
        post: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
