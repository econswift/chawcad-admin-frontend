import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import dashboard from "./dashboardReducer";
import transaction from "./transactionReducer";
import user from "./userReducer";
import post from "./postReducer";

export default combineReducers({
  auth,
  alert,
  profile,
  dashboard,
  transaction,
  user,
  post,
});
