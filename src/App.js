import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import React, { Fragment } from "react";
import Login from "./pages/Login";
import PageRender from "./customRouter/PageRender";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import PrivateRouter from "./customRouter/PrivateRouter";
// import { profile } from "./redux/actions/profileAction";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const [show, setShow] = useState(false);

  return (
    <Router>
      <Alert />
      <div
        className={
          auth.token
            ? "font-montserrat lg:flex bg-primary "
            : " font-montserrat "
        }
      >
        <div
          className={
            auth.token
              ? "lg:w-[300px] min-w-[300px] visible  lg:h-[calc(100vh)] lg:overflow-y-auto lg:no-scrollbar"
              : "hidden"
          }
        >
          <Navbar show={show} setShow={setShow} />
        </div>

        <div
          className={
            show ? "w-full fixed lg:relative " : "w-full overflow-x-auto"
          }
        >
          <Routes>
            <Route
              exact
              path="/"
              element={auth.token ? <Dashboard /> : <Login />}
            />
            <Route exact path="/" element={<PrivateRouter />}>
              <Route exact path="/:page" element={<PageRender />} />
              <Route exact path="/:page/:id" element={<PageRender />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
