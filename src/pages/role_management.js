import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../redux/actions/profileAction";
import AdminTable from "../components/AdminTable";
import { getAdmin, getUser } from "../redux/actions/userAction";
import { IoCloseOutline } from "react-icons/io5";
import { adminSignUp } from "../redux/actions/authAction";
import Pagination from "react-js-pagination";

const Role_management = () => {
  const initialState = {
    email: "",
    password: "",
    last_name: "",
    first_name: "",
    phone: "",
    role: "Admin",
  };
  const [userData, setUserData] = useState(initialState);

  const [search, setSearch] = useState("");

  const { email, password, role, first_name, last_name, phone } = userData;

  const [register, setRegister] = useState(false);

  const [typePass, setTypePass] = useState(false);

  const { auth, user, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile(auth.token));
    dispatch(getAdmin(auth.token, search));
  }, [dispatch, auth.token, search]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(adminSignUp(userData, auth.token));

    dispatch(getAdmin(auth.token));
  };

  return (
    <div className="lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white w-full md:py-[38px] md:px-[64px] px-[16px] py-[12px]  h-[calc(100vh)] overflow-y-auto overflow-x-auto no-scrollbar relative">
      <div className="flex items-center">
        <h4 className="text-primary text-[24px] font-semibold hidden md:block w-[350px]">
          Role management
        </h4>
        <div className="relative md:ml-[30px] mx-[27px] w-full">
          <input
            className="relative py-[4px] pl-[30px] placeholder:text-gray-300 placeholder:text-[18px] border-b-[1px] border-gray-300 md:w-[100%] xl:w-[80%] w-[100%] outline-primary focus:outline-none focus:border-b-primary focus:bg-lime-50 text-primary"
            type="text"
            name="search"
            placeholder="Search anything"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoSearchOutline className="absolute left-0 top-[6px] text-gray-400 text-[20px]" />
        </div>
      </div>

      <div className="overflow-x-auto mt-[70px]">
        <AdminTable status={10} height="" />
      </div>

      <button
        onClick={() => setRegister(!register)}
        className="font-semibold text-primary mt-[15px] flex items-center"
      >
        <HiOutlineUserPlus className="text-[25px] mr-[8px]" />
        Add new role/user
      </button>

      {register && (
        <div
          className="fixed center w-full h-full"
          style={{
            background: "#0007",
            color: "white",
            top: 0,
            left: 0,
            zIndex: 80,
          }}
        >
          <div
            onClick={() => setRegister(!register)}
            className="bg-white absolute right-[10px] top-[10px] cursor-pointer"
          >
            <IoCloseOutline className="text-primary text-[40px] " />
          </div>

          <div className="flex justify-center md:h-[calc(80vh-10.75rem)] h-[calc(80vh-10.75rem)] overflow-y-auto overflow-x-hidden">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mt-[32px]  md:w-[360px] w-[300px]   ">
                  <input
                    className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First name"
                    onChange={handleChangeInput}
                    value={first_name}
                  />
                </div>
                <h2 className="text-red-600 text-[14px] mt-[10px]">
                  {alert.emptyInput?.first_name
                    ? alert.emptyInput?.first_name
                    : ""}
                </h2>
                <div className="mt-[32px]  md:w-[360px] w-[300px]   ">
                  <input
                    className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last name"
                    onChange={handleChangeInput}
                    value={last_name}
                  />
                </div>
                <h2 className="text-red-600 text-[14px] mt-[10px]">
                  {alert.emptyInput?.last_name
                    ? alert.emptyInput?.last_name
                    : ""}
                </h2>
                <div hidden className="mt-[32px]  md:w-[360px] w-[300px]   ">
                  <input
                    className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Role"
                    onChange={handleChangeInput}
                    value={role}
                  />
                </div>
                <div className="mt-[32px]  md:w-[360px] w-[300px]   ">
                  <input
                    className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={handleChangeInput}
                    value={phone}
                  />
                </div>
                <h2 className="text-red-600 text-[14px] mt-[10px]">
                  {alert.emptyInput?.phone ? alert.emptyInput?.phone : ""}
                </h2>
                <div className="mt-[32px]  md:w-[360px] w-[300px]   ">
                  <input
                    className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={handleChangeInput}
                    value={email}
                  />
                </div>
                <h2 className="text-red-600 text-[14px] mt-[10px]">
                  {alert.emptyInput?.email ? alert.emptyInput?.email : ""}
                </h2>
                <div className="mt-[32px]  md:w-[360px] w-[300px]   ">
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

                <h2 className="text-red-600 text-[14px] mt-[10px]">
                  {alert.emptyInput?.password ? alert.emptyInput?.password : ""}
                </h2>

                <button
                  type="submit"
                  className="w-full py-[12px] text-[16px] font-semibold bg-primary text-white rounded-[8px] mt-[24px] hover:bg-lime-800"
                  // disabled={email && password ? false : true}
                >
                  Create Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* <div
        className={
          user.user === [] ||
          user.loading === true ||
          alert.loading === true ||
          user?.user?.meta?.total <= 10
            ? "hidden"
            : "flex justify-center text-lg mb-16 "
        }
      >
        <Pagination
          activePage={user?.user?.meta?.current_page}
          totalItemsCount={user?.user?.meta?.total}
          itemsCountPerPage={user?.user?.meta?.per_page}
          onChange={getPage}
          itemClass="text-primary border-[1px] border-primary w-[50px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-light hover:text-lighter"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
          itemClassFirst={
            user?.user?.meta?.current_page === 1
              ? "hidden"
              : " text-[16px] font-medium text-lime-200 bg-primary cursor-pointer hover:bg-primary hover:text-lighter"
          }
          itemClassLast={
            user?.user?.meta?.current_page === user?.user?.meta?.last_page
              ? "hidden"
              : " text-[16px] font-medium text-lime-200 bg-primary cursor-pointer hover:bg-primary hover:text-lighter"
          }
          activeClass="text-primary bg-lighter w-[50px] h-[30px] flex justify-center items-center hover:bg-lighter hover:text-primary cursor-text"
          innerClass="flex text-black mt-10"
          itemClassNext="hidden"
          itemClassPrev="hidden"
          pageRangeDisplayed={4}
        />
      </div> */}
    </div>
  );
};

export default Role_management;
