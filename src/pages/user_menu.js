import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import UserTable from "../components/UserTable";
import { getUser } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../redux/actions/profileAction";
import Pagination from "react-js-pagination";

const User_menu = () => {
  const [search, setSearch] = useState("");

  const { auth, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const perPage = 10;

  const getPage = async (pageNumber) => {
    dispatch(getUser(auth.token, perPage, pageNumber, search));
  };

  useEffect(() => {
    // dispatch(getUser(auth.token));
    dispatch(profile(auth.token));
    getPage();
  }, [dispatch, auth.token, search]);

  return (
    <div className="lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white w-full md:py-[38px] md:px-[64px] px-[16px] py-[12px]  h-[calc(100vh)] overflow-y-auto overflow-x-auto no-scrollbar">
      <div className="flex items-center">
        <h4 className="text-primary text-[24px] font-semibold hidden md:block w-[200px]">
          User menu
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

      <div className="mt-[86px] flex items-center">
        <h4 className="mr-[8px] text-primary text-[20px] font-semibold">
          Users
        </h4>
        <h4 className="py-[2px] px-[8px] text-primary font-medium bg-lighter rounded-[16px]">
          {user?.user?.meta?.total} users
        </h4>
      </div>

      <div className="overflow-x-auto mt-[20px]">
        <UserTable status={10} height="" />
      </div>

      <div
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
      </div>
    </div>
  );
};

export default User_menu;
