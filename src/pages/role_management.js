import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import MenuTable from "../components/MenuTable";

const Role_management = () => {
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
      <div className="overflow-x-auto overflow-y-auto mt-[20px] h-[calc(100vh-10.75rem)]">
        {/* <MenuTable /> */}
      </div>
    </div>
  );
};

export default Role_management;
