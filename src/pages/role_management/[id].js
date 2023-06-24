import React, { useEffect, useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import Avatar from "../../components/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import { getOneAdmin } from "../../redux/actions/userAction";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { postDocument } from "../../redux/actions/postAction";
import { toggleActivation } from "../../redux/actions/postAction";
import { getDataApi } from "../../utils/fetchData";

const Admin = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const data = user?.user?.data;

  const [active, setActive] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataApi(`admin-users/${id}`, auth.token);
        setActive(response?.data?.data?.active);
      } catch (error) {}
    };

    fetchData();
  }, [auth.token]);

  useEffect(() => {
    dispatch(profile(auth.token));
    dispatch(getOneAdmin(auth.token, id));
  }, [dispatch, auth.token]);

  const verify = true;

  const handleSend = (e) => {
    e.preventDefault();
    // dispatch(postDocument(auth.token, id, files));
    dispatch(toggleActivation(auth.token, id, verify, verify, active));
    dispatch(getOneAdmin(auth.token, id));
  };

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

      <form
        onSubmit={handleSend}
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
                <div className="mt-[32px] grid md:grid-cols-2 grid-cols-1 gap-[24px] w-full">
                  <div className="w-full">
                    <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                      First name
                    </h4>
                    <input
                      disabled
                      className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder={data?.first_name}
                      //   onChange={handleChangeInput}
                      //   value={email}
                    />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                      Last name
                    </h4>
                    <input
                      disabled
                      className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50 "
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder={data?.last_name}
                      //   onChange={handleChangeInput}
                      //   value={email}
                    />
                  </div>
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Email
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={data?.email}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Phone
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder={data?.phone}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Referral number
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="number"
                    name="referral_number"
                    id="referral_number"
                    placeholder={data?.referral_number}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Voucher ID
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="number"
                    name="voucher_id"
                    id="voucher_id"
                    placeholder={data?.voucher_id}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Voucher balance
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="number"
                    name="voucher_balance"
                    id="voucher_balance"
                    placeholder={data?.voucher_balance}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Points
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="number"
                    name="points"
                    id="points"
                    placeholder={data?.points}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    IP address
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="number"
                    name="ip_address"
                    id="ip_address"
                    placeholder={data?.ip_address}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    DOB
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder={data?.dob}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Role
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="role"
                    id="role"
                    placeholder={data?.role}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    System verification
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="system_verification"
                    id="system_verification"
                    placeholder={
                      data?.system_verification === true ? "True" : "False"
                    }
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    National verification
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="national_verification"
                    id="national_verification"
                    placeholder={
                      data?.national_verification === true ? "True" : "False"
                    }
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Is business
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="is_business"
                    id="is_business"
                    placeholder={data?.is_business === true ? "True" : "False"}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Force password change
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="force_password_change"
                    id="force_password_change"
                    placeholder={
                      data?.force_password_change === true ? "True" : "False"
                    }
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Created
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="created"
                    id="created"
                    placeholder={moment(data?.created_at).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>
                <div className="mt-[24px]">
                  <h4 className="mb-[6px] text-[16px] xl:text-[18px] text-primary font-medium">
                    Updated
                  </h4>
                  <input
                    disabled
                    className=" border-[3px] border-[#E2EFE4] w-full placeholder:text-[18px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                    type="text"
                    name="updated"
                    id="updated"
                    placeholder={moment(data?.updated_at).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                    //   onChange={handleChangeInput}
                    //   value={email}
                  />
                </div>

                <div className="flex mt-[30px]">
                  <div
                    onClick={() => setActive(!active)}
                    className={
                      active === true
                        ? "bg-primary cursor-pointer relative min-w-[40px]  h-[20px] rounded-full"
                        : "bg-gray-300 cursor-pointer relative min-w-[40px]  h-[20px] rounded-full"
                    }
                  >
                    {active === true ? (
                      <div
                        className={`bg-white h-[16px] w-[16px] rounded-full  ${
                          active === true
                            ? "translate-x-full absolute top-1/2 transform  -translate-y-1/2 left-[6px]"
                            : "translate-x-0 absolute top-1/2 transform  -translate-y-1/2 left-[2px]"
                        } ease-in-out duration-500`}
                      ></div>
                    ) : (
                      <div
                        className={`bg-white h-[16px] w-[16px] rounded-full  ${
                          active === false
                            ? "translate-x-0 absolute top-1/2 transform  -translate-y-1/2 left-[2px]"
                            : "translate-x-full absolute top-1/2 transform  -translate-y-1/2 left-[6px]"
                        } ease-in-out duration-500`}
                      ></div>
                    )}
                  </div>
                  <div className="ml-[10px]">
                    <h4 className="font-semibold text-primary">Activate</h4>
                    <h4 className="text-light">
                      Activate or deactivate the user account
                    </h4>
                  </div>
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

                  <button className=" text-white bg-primary px-[16px] py-[10px] rounded-[8px] ">
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

export default Admin;
