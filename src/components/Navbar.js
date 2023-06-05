import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { SlSettings } from "react-icons/sl";
import { IoWalletOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/actions/authAction";
import { postDataApi, getDataApi } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import profilepic from "../assets/profile.jpeg";

const Navbar = ({ show, setShow }) => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(profile());
  // }, [dispatch]);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      localStorage.removeItem("firstLogin");
      // await postDataApi("user/logout");

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
      navigate("/");
      // window.location.href = "/";
      window.location.reload(true);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  return (
    <div>
      <div className="bg-primary lg:tall:h-screen lg:h-[calc(100vh+30rem)]  py-[48px] relative hidden lg:block ">
        <div className="flex justify-between items-center pl-[34px] pr-[27px] mb-[70px]">
          <div className="w-[64px] relative">
            {profile?.profile?.data?.avatar === null ? (
              <div className="w-[64px] h-[64px] rounded-full flex justify-center items-center text-primary bg-lighter text-[24px] font-semibold">
                {profile?.profile?.data?.initials}
              </div>
            ) : (
              <Avatar
                width="w-[64px]"
                height="w-[64px]"
                src={profile?.profile?.data?.avatar}
              />
            )}

            {profile?.profile?.data?.is_online === true && (
              <div className="w-[16px] h-[16px] border-[2px] border-white bg-green-400 rounded-full absolute right-0 bottom-0"></div>
            )}
          </div>
          <div>
            <h4 className="text-white text-[18px] font-light">Hello,</h4>
            <h4 className="text-white text-[18px] font-semibold">
              {profile?.profile?.data?.first_name}
              {"   "}
              {profile?.profile?.data?.last_name}
            </h4>
          </div>
          <HiOutlineLogout
            onClick={() => dispatch(logout)}
            className="text-white text-[30px] stroke-1"
          />
        </div>

        <NavLink
          className="flex px-[34px] py-[15px] rounded-l-[25px] items-center hover:bg-light"
          to="/"
          style={({ isActive }) => ({
            backgroundColor: isActive ? " white" : "",
            color: isActive ? " #0A5438" : "white",
          })}
        >
          <RxDashboard className=" text-[24px]" />
          <h4 className="ml-[14px] text-[18px] font-medium">Dashboard</h4>
        </NavLink>
        <NavLink
          className="flex px-[34px] py-[15px] rounded-l-[25px] items-center hover:bg-light"
          to="/transactions"
          style={({ isActive }) => ({
            backgroundColor: isActive ? " white" : "",
            color: isActive ? " #0A5438" : "white",
          })}
        >
          <IoWalletOutline className=" text-[24px]" />
          <h4 className="ml-[14px] text-[18px] font-medium">Transactions</h4>
        </NavLink>
        <NavLink
          className="flex px-[34px] py-[15px] rounded-l-[25px] items-center hover:bg-light"
          to="/user_menu"
          style={({ isActive }) => ({
            backgroundColor: isActive ? " white" : "",
            color: isActive ? " #0A5438" : "white",
          })}
        >
          <HiOutlineUsers className=" text-[24px]" />
          <h4 className="ml-[14px] text-[18px] font-medium">User menu</h4>
        </NavLink>
        <NavLink
          className="flex px-[34px] py-[15px] rounded-l-[25px] items-center hover:bg-light"
          to="/role_management"
          style={({ isActive }) => ({
            backgroundColor: isActive ? " white" : "",
            color: isActive ? " #0A5438" : "white",
          })}
        >
          <RiUserSettingsLine className=" text-[24px]" />
          <h4 className="ml-[14px] text-[18px] font-medium">Role management</h4>
        </NavLink>
        <NavLink
          className="flex px-[34px] py-[15px] rounded-l-[25px] items-center hover:bg-light"
          to="/settings"
          style={({ isActive }) => ({
            backgroundColor: isActive ? " white" : "",
            color: isActive ? " #0A5438" : "white",
          })}
        >
          <SlSettings className=" text-[24px]" />
          <h4 className="ml-[14px] text-[18px] font-medium">Settings</h4>
        </NavLink>
        <div className="bg-white absolute bottom-[39px] ml-[32px] p-[12px] rounded-[20px]">
          <img className="w-[111px]" src={logo} />
        </div>
      </div>
      <div className="pt-[50px] pb-[12px] md:px-[64px] px-[16px] bg-primary block lg:hidden">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white p-[8px] rounded-[16px]">
              <img className="w-[88px]" src={logo} />
            </div>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                display: isActive ? "block" : "none",
              })}
              className="text-white text-[18px] font-semibold ml-[16px]"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/transactions"
              style={({ isActive }) => ({
                display: isActive ? "block" : "none",
              })}
              className="text-white text-[18px] font-semibold ml-[16px]"
            >
              Transaction
            </NavLink>
            <NavLink
              to="/user_menu"
              style={({ isActive }) => ({
                display: isActive ? "block" : "none",
              })}
              className="text-white text-[18px] font-semibold ml-[16px]"
            >
              User menu
            </NavLink>
            <NavLink
              to="/role_management"
              style={({ isActive }) => ({
                display: isActive ? "block" : "none",
              })}
              className="text-white text-[18px] font-semibold ml-[16px]"
            >
              Role management
            </NavLink>
            <NavLink
              to="/settings"
              style={({ isActive }) => ({
                display: isActive ? "block" : "none",
              })}
              className="text-white text-[18px] font-semibold ml-[16px]"
            >
              Settings
            </NavLink>
          </div>
          <IoIosMenu
            onClick={() => setShow(!show)}
            className="text-white text-[40px]"
          />
        </div>
      </div>

      <div
        className={`fixed w-full h-full block lg:hidden ${
          show ? "translate-x-0" : "translate-x-full"
        } ease-in-out duration-500`}
        style={{
          minWidth: show ? "200px" : "",
          zIndex: show ? 50 : "",
          background: show ? "#0007" : "",
          color: show ? "white" : "",
          top: show ? 0 : 0,
        }}
      >
        <div
          className={`top-0 right-0 z-40 absolute overflow-y-auto lg:h-[calc(100vh+30rem)] bg-white w-3/4 h-screen pt-[50px]  xl:hidden ${
            show ? "translate-x-0" : "translate-x-full"
          } ease-in-out duration-500`}
        >
          <div className="relative h-full">
            <div className="flex justify-end mr-[16px] md:mr-[64px]">
              <IoCloseOutline
                onClick={() => setShow(!show)}
                className="text-primary text-[40px] "
              />
            </div>
            <div className="flex justify-between items-center px-[20px] md:px-[64px] mb-[70px]">
              <div className="flex items-center">
                <div className="w-[64px] relative">
                  {profile?.profile?.data?.avatar === null ? (
                    <div className="w-[64px] h-[64px] rounded-full flex justify-center items-center text-primary bg-lighter text-[24px] font-semibold">
                      {profile?.profile?.data?.initials}
                    </div>
                  ) : (
                    <Avatar
                      width="w-[64px]"
                      height="w-[64px]"
                      src={profile?.profile?.data?.avatar}
                    />
                  )}

                  {profile?.profile?.data?.is_online === true && (
                    <div className="w-[16px] h-[16px] border-[2px] border-white bg-green-400 rounded-full absolute right-0 bottom-0"></div>
                  )}
                </div>
                <div className="sm:ml-[30px] ml-[20px]">
                  <h4 className="text-primary text-[18px]">Hello,</h4>
                  <h4 className="text-primary text-[18px] font-semibold">
                    {profile?.profile?.data?.first_name}
                    {"   "}
                    {profile?.profile?.data?.last_name}
                  </h4>
                </div>
              </div>
              <HiOutlineLogout
                onClick={() => dispatch(logout)}
                className="text-primary text-[30px] stroke-1"
              />
            </div>
            <NavLink
              onClick={() => setShow(!show)}
              className="flex px-[20px] md:px-[64px] py-[15px] rounded-r-[25px] items-center hover:bg-light"
              to="/"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#0007" : "",
                color: isActive ? "white" : " #0A5438",
              })}
            >
              <RxDashboard className=" text-[24px]" />
              <h4 className="ml-[14px] text-[18px] font-medium">Dashboard</h4>
            </NavLink>
            <NavLink
              onClick={() => setShow(!show)}
              className="flex px-[20px] md:px-[64px]  py-[15px] rounded-r-[25px] items-center hover:bg-light"
              to="/transactions"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#0007" : "",
                color: isActive ? "white" : " #0A5438",
              })}
            >
              <IoWalletOutline className=" text-[24px]" />
              <h4 className="ml-[14px] text-[18px] font-medium">
                Transactions
              </h4>
            </NavLink>
            <NavLink
              onClick={() => setShow(!show)}
              className="flex px-[20px] md:px-[64px] py-[15px] rounded-r-[25px] items-center hover:bg-light"
              to="/user_menu"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#0007" : "",
                color: isActive ? "white" : " #0A5438",
              })}
            >
              <HiOutlineUsers className=" text-[24px]" />
              <h4 className="ml-[14px] text-[18px] font-medium">User menu</h4>
            </NavLink>
            <NavLink
              onClick={() => setShow(!show)}
              className="flex px-[20px] md:px-[64px] py-[15px] rounded-r-[25px] items-center hover:bg-light"
              to="/role_management"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#0007" : "",
                color: isActive ? "white" : " #0A5438",
              })}
            >
              <RiUserSettingsLine className=" text-[24px]" />
              <h4 className="ml-[14px] text-[18px] font-medium">
                Role management
              </h4>
            </NavLink>
            <NavLink
              onClick={() => setShow(!show)}
              className="flex px-[20px] md:px-[64px] py-[15px] rounded-r-[25px] items-center hover:bg-light"
              to="/settings"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#0007" : "",
                color: isActive ? "white" : " #0A5438",
              })}
            >
              <SlSettings className=" text-[24px]" />
              <h4 className="ml-[14px] text-[18px] font-medium">Settings</h4>
            </NavLink>

            <div className="bg-white absolute bottom-[30px] ml-[20px] md:ml-[64px] rounded-[20px] hidden tall:block">
              <img className="w-[111px]" src={logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
