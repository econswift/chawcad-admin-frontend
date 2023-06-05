import { GLOBALTYPES } from "../actions/globalTypes";

const initialStore = {
  loading: false,
  transaction: [],
  error: "",
};

const transactionReducer = (state = initialStore, action) => {
  switch (action.type) {
    case GLOBALTYPES.TRANSACTION_REQUEST:
      return {
        ...state,
        transaction: [],
        loading: true,
      };

    case GLOBALTYPES.TRANSACTION_SUCCESS:
      return {
        loading: false,
        transaction: action.payload,
        error: "",
      };

    case GLOBALTYPES.TRANSACTION_FAILURE:
      return {
        loading: false,
        transaction: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
