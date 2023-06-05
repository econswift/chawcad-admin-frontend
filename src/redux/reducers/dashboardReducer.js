import { GLOBALTYPES } from "../actions/globalTypes";

const initialStore = {
  loading: false,
  dashboard: [],
  error: "",
};

const dashboardReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GLOBALTYPES.DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GLOBALTYPES.DASHBOARD_SUCCESS:
      return {
        loading: false,
        dashboard: action.payload,
        error: "",
      };

    case GLOBALTYPES.DASHBOARD_FAILURE:
      return {
        loading: false,
        dashboard: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
