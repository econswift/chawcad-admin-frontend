import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import dashboard from "./dashboardReducer";
import transaction from "./transactionReducer";
import user from "./userReducer";

export default combineReducers({
  auth,
  alert,
  profile,
  dashboard,
  transaction,
  user,
});
