import { Outlet, Navigate } from "react-router-dom";

function PrivateRouter(props) {
  const firstLogin = localStorage.getItem("firstLogin");
  return firstLogin ? <Outlet {...props} /> : <Navigate to="/" />;
}

export default PrivateRouter;
