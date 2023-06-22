import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../components/Avatar";
import { profile as profileAction } from "../redux/actions/profileAction";
import { passwordChange } from "../redux/actions/profileAction";

const Settings = () => {
  const navigate = useNavigate();

  const initialState = { oldPassword: "", newPassword: "" };
  const [userData, setUserData] = useState(initialState);
  const { oldPassword, newPassword } = userData;

  const [typePass, setTypePass] = useState(false);

  const { profile, auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const data = profile?.profile?.data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.oldPassword !== "" && userData.newPassword !== "")
      dispatch(
        passwordChange(auth.token, userData.oldPassword, userData.newPassword)
      );
    // dispatch(profile());
  };

  useEffect(() => {
    dispatch(profileAction(auth.token));
  }, [dispatch, auth.token]);
  return (
    <div className="lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white w-full md:py-[38px] md:px-[64px] px-[16px] py-[12px]  h-[calc(100vh)] overflow-y-auto overflow-x-auto ">
      <div className="flex items-center">
        <h4 className="text-primary text-[24px] font-semibold hidden md:block">
          Settings
        </h4>
        <div className="relative md:ml-[69px] mx-[27px] w-full">
          <input
            className="relative py-[4px] pl-[30px] placeholder:text-gray-300 placeholder:text-[18px] border-b-[1px] border-gray-300 md:w-[80%] w-[100%] outline-primary focus:outline-none focus:border-b-primary focus:bg-lime-50 text-primary"
            type="text"
            name="search"
            // placeholder="Search anything"
            // onChange={(e) => setSearch(e.target.value)}
            // value={search}
          />
          <IoSearchOutline className="absolute left-0 top-[6px] text-gray-400 text-[20px]" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-x-auto w-full mt-[50px] h-[calc(100vh-10.75rem)]"
      >
        <div className="md:flex w-full">
          <div className="relative w-[127px]">
            {data?.avatar === null ? (
              <div className="w-[127px] h-[127px] rounded-full flex justify-center items-center text-primary bg-lighter text-[35px] font-medium uppercase">
                {data?.initials}
              </div>
            ) : (
              <Avatar width="w-[127px]" height="w-[127px]" src={data?.avatar} />
            )}

            {data?.is_online === true && (
              <div className="w-[14px] h-[14px] border-[2px] border-white bg-green-400 rounded-full absolute right-0 bottom-0"></div>
            )}
          </div>
          <div className="md:ml-[18px] mt-[40px] w-full">
            <h4 className=" text-[22px] font-medium capitalize text-primary ">
              {data?.first_name} {data?.last_name}
            </h4>
            <h4 className="lowercase text-light font-light">
              {" "}
              @{data?.first_name}
            </h4>
            <div>
              <div className="mt-[30px] border-b-[1px] border-[#E2EFE4] pb-[20px] w-[100%] xl:w-[80%]">
                <h4 className=" text-[20px] font-medium capitalize text-primary ">
                  Personal info
                </h4>
                <h4 className="lowercase text-light font-light mt-[4px]">
                  Update your photo and personal details here.
                </h4>
              </div>

              <div className="px-[20px] xl:w-[80%] pb-[50px]">
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Current password
                  </h4>
                  <input
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Enter current password"
                    onChange={handleChangeInput}
                    value={oldPassword}
                  />
                </div>
                <h2 className="text-red-400 text-[14px] mt-[10px]">
                  {alert.emptyInput?.current_password
                    ? alert.emptyInput?.current_password
                    : ""}
                </h2>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    New password
                  </h4>
                  <div className="relative">
                    <input
                      className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                      type={typePass ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter new password"
                      onChange={handleChangeInput}
                      value={newPassword}
                    />
                    <small
                      className="cursor-pointer absolute top-1/2  transform  -translate-y-1/2 right-[20px] font-semibold text-primary"
                      onClick={() => setTypePass(!typePass)}
                    >
                      {typePass ? "Hide" : "Show"}
                    </small>
                  </div>
                  <h2 className="text-red-400 text-[14px] mt-[10px]">
                    {alert.emptyInput?.password
                      ? alert.emptyInput?.password
                      : ""}
                  </h2>
                </div>
                <div className="flex justify-end mt-[40px]">
                  <h4
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="border-[2px] border-[#E2EFE4] text-primary px-[16px] py-[10px] rounded-[8px] mr-[15px] font-semibold cursor-pointer"
                  >
                    Cancel
                  </h4>

                  <button
                    className={
                      userData.oldPassword === "" || userData.newPassword === ""
                        ? "text-white bg-primary px-[16px] py-[10px] rounded-[8px] cursor-not-allowed"
                        : "text-white bg-primary px-[16px] py-[10px] rounded-[8px] "
                    }
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
