import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/actions/userAction";
import { Link } from "react-router-dom";
import moment from "moment";
import Avatar from "./Avatar";
import LoadIcon from "../assets/loading.gif";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { getAdmin } from "../redux/actions/userAction";

const AdminTable = () => {
  const { user, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(user?.user);

  useEffect(() => {
    dispatch(getAdmin(auth.token));
  }, [dispatch, auth.token]);

  return (
    <div className="md:h-[calc(80vh-10.75rem)] h-[calc(80vh-10.75rem)]">
      <div className="">
        <table className="w-full md:min-w-[1000px] min-w-[1000px]   ">
          <thead className="">
            <tr className="font-semibold text-light text-[16px] border-b-[1px] border-gray-200">
              <td>
                <input
                  className="w-[15px] h-[15px] cursor-pointer rounded accent-light flex items-center"
                  name="button"
                  type="checkbox"
                  placeholder=""
                />
              </td>
              <td className="text-center">Name</td>
              {/* <td>ID</td>
            <td className="">
              <h4 className="w-max">Referral number</h4>
            </td> */}
              <td>
                <h4 className="w-max">Email address</h4>
              </td>
              {/* <td>
              <h4 className="w-max">Voucher ID</h4>
            </td> */}
              <td>
                <h4 className="w-max">Voucher balance</h4>
              </td>
              {/* <td>Points</td>
            <td>
              {" "}
              <h4 className="w-max">IP address</h4>
            </td>
            <td>DOB</td> */}
              <td>Role</td>
              <td>
                <h4 className="w-max ">Verified</h4>
              </td>
              {/* <td>
              <h4 className="w-max">National Verification</h4>
            </td> */}

              {/* <td>
              <h4 className="w-max">Is business</h4>
            </td>
            <td>
              <h4 className="w-max">Force password change</h4>
            </td>
            <td>Created</td>
            <td>Updated</td> */}
            </tr>
          </thead>

          {user?.user && user?.user?.length
            ? user?.user?.map((data) => (
                <tbody key={data.id} className="body ">
                  <tr
                    className={
                      "text-[16px] text-primary border-b-[1px] border-gray-200"
                    }
                  >
                    <td>
                      <input
                        className="w-[15px] h-[15px] cursor-pointer rounded accent-light  flex items-center"
                        name="button"
                        type="checkbox"
                        placeholder=""
                      />
                    </td>
                    <td>
                      <div className="flex items-center">
                        <div className="relative w-[60px]">
                          {data.image === null ? (
                            <Avatar
                              width="w-[60px]"
                              height="w-[60px]"
                              src="https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
                            />
                          ) : (
                            <Avatar
                              width="w-[60px]"
                              height="w-[60px]"
                              src={data.avatar}
                            />
                          )}

                          {data.is_online === true && (
                            <div className="w-[14px] h-[14px] border-[2px] border-white bg-green-400 rounded-full absolute right-0 bottom-0"></div>
                          )}
                        </div>
                        <div className="ml-[12px]">
                          <h4 className="w-max text-[18px] font-medium capitalize">
                            {data.first_name} {data.last_name}
                          </h4>
                          <h4 className="lowercase text-light font-light">
                            @{data.first_name}
                          </h4>
                        </div>
                      </div>
                    </td>
                    {/* <td>
                    <h4 className="w-max">{data.id}</h4>
                  </td> */}
                    {/* <td className="text-end">{data.referral_number}</td> */}
                    <td className="">{data.email}</td>
                    {/* <td>{data.voucher_id}</td> */}
                    <td>{data.voucher_balance}</td>
                    {/* <td>{data.points}</td> */}
                    {/* <td>{data.ip_address}</td> */}
                    {/* <td>
                    <h4 className="w-max">{data.dob}</h4>
                  </td> */}
                    <td>{data.role}</td>
                    <td className="">
                      {data.system_verification === true && (
                        <h4 className="text-primary font-medium bg-lighter w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                          True
                        </h4>
                      )}
                      {data.system_verification === false && (
                        <h4 className="text-red-400 font-medium bg-red-100 w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                          False
                        </h4>
                      )}
                    </td>
                    {/* <td className="">
                    {data.national_verification === true && (
                      <h4 className="text-primary font-medium bg-lighter w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                        True
                      </h4>
                    )}
                    {data.national_verification === false && (
                      <h4 className="text-red-400 font-medium bg-red-100 w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                        False
                      </h4>
                    )}
                  </td> */}

                    {/* <td>
                    {data.is_business === true && (
                      <h4 className="text-primary font-medium bg-lighter w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                        True
                      </h4>
                    )}
                    {data.is_business === false && (
                      <h4 className="text-red-400 font-medium bg-red-100 w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                        False
                      </h4>
                    )}
                  </td> */}
                    {/* <td>
                    {data.force_password_change === true && (
                      <h4 className="text-primary font-medium bg-lighter w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                        true
                      </h4>
                    )}
                    {data.force_password_change === false && (
                      <h4 className="text-red-400 font-medium bg-red-100 w-[70px] text-center px-[15px] py-[2px] rounded-[5px]">
                        False
                      </h4>
                    )}
                  </td> */}
                    {/* <td>
                    <h4 className="w-max">
                      {moment(data.created_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </h4>
                  </td>
                  <td>
                    <h4 className="w-max">
                      {moment(data.updated_at).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </h4>
                  </td> */}
                    <td>
                      <RiDeleteBinLine className="text-[20px]" />
                    </td>
                    <td>
                      <Link to={`/user_menu/${data.id}`}>
                        <FiEdit2 className="text-[20px]" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
        </table>
        {user.loading && (
          <div className=" flex justify-center w-2/3 mx-auto my-[100px]">
            <img className="mx-auto w-[40px]" src={LoadIcon} alt="loading" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;
