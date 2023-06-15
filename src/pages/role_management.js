import React, { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../redux/actions/profileAction";
import AdminTable from "../components/AdminTable";
import { getAdmin, getUser } from "../redux/actions/userAction";
import Pagination from "react-js-pagination";

const Role_management = () => {
  const { auth, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile(auth.token));
    dispatch(getAdmin(auth.token));
  }, [dispatch, auth.token]);

  return (
    <div className="lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white w-full md:py-[38px] md:px-[64px] px-[16px] py-[12px]  h-[calc(100vh)] overflow-y-auto overflow-x-auto no-scrollbar">
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
          />
          <IoSearchOutline className="absolute left-0 top-[6px] text-gray-400 text-[20px]" />
        </div>
      </div>

      <div className="overflow-x-auto mt-[70px]">
        <AdminTable status={10} height="" />
      </div>

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
