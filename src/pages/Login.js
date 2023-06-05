import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../redux/actions/authAction";
// import { useRouter } from "next/router";
import { profile } from "../redux/actions/profileAction";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);
  // const router = useRouter();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
    // dispatch(profile());
  };

  return (
    <div className="h-[calc(100vh-5.75rem)] bg-white md:flex justify-center items-center mx-auto  md:w-[360px] px-[16px]  py-[48px] ">
      <div className="m-auto">
        <div className="flex justify-center">
          <img className="md:w-[146px] w-[88px]" src={logo} />
        </div>
        <h4 className="mt-[24px] text-[20px] md:text-[30px] font-semibold text-primary flex justify-center text-center">
          Log in to your account
        </h4>
        <h4 className="text-[14px] md:text-[16px] text-light flex justify-center text-center mt-[8px]">
          Welcome back! Please enter your details.
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mt-[32px]  md:w-[360px] ">
            <h4 className="mb-[6px] text-[12px] md:text-[14px] xl:text-[18px] text-primary font-medium">
              Email
            </h4>
            <input
              className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChangeInput}
              value={email}
            />
          </div>
          <h2 className="text-red-400 text-[14px] mt-[10px]">
            {alert.emptyInput?.email ? alert.emptyInput?.email : ""}
          </h2>
          <div className="mt-[20px]  md:w-[360px] ">
            <h4 className="mb-[6px] text-[12px] md:text-[14px] xl:text-[18px] text-primary font-medium">
              Password
            </h4>
            <div className="relative">
              <input
                className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                type={typePass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChangeInput}
                value={password}
              />

              <small
                className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                onClick={() => setTypePass(!typePass)}
              >
                {typePass ? "Hide" : "Show"}
              </small>
            </div>
          </div>
          <h2 className="text-red-400 text-[14px] mt-[10px]">
            {alert.emptyInput?.password ? alert.emptyInput?.password : ""}
          </h2>
          <div className="flex mt-[24px] items-center justify-between">
            <div className="flex items-center ">
              <input
                className="w-[15px] h-[15px] cursor-pointer rounded accent-primary"
                name="button"
                type="checkbox"
                placeholder=""
              />

              <h4 className="text-[14px] ml-[8px] font-medium text-primary text-center">
                Remember for 30 days
              </h4>
            </div>
            <h4 className="text-[14px] font-semibold text-primary text-center">
              Forgot password
            </h4>
          </div>
          <button
            type="submit"
            className="w-full py-[12px] text-[16px] font-semibold bg-primary text-white rounded-[30px] mt-[24px] hover:bg-lime-800"
            // disabled={email && password ? false : true}
          >
            Sign in
          </button>
          <div className="mt-[32px] flex justify-center">
            <h4 className="mr-[4px] text-light text-[14px]">
              Don’t have an account?
            </h4>
            <h4
              className="text-primary text-[14px] font-semibold

          "
            >
              <Link to="#">Sign up</Link>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
