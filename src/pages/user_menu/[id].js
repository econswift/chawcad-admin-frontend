import React, { useEffect, useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import Avatar from "../../components/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import { getOneUser } from "../../redux/actions/userAction";
import moment from "moment";
import { postDocument } from "../../redux/actions/postAction";
import { toggleActivation } from "../../redux/actions/postAction";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { deleteDocument } from "../../redux/actions/postAction";
import { getDataApi } from "../../utils/fetchData";

const User = () => {
  const { id } = useParams();
  const [deleteFile, setDeleteFile] = useState(false);
  const [getId, setGetId] = useState("");

  const { user, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const data = user?.user?.data;

  const document = user?.user?.data?.documents;

  const [systemVerification, setSystemVerification] = useState(null);
  const [nationalVerification, setNationalVerification] = useState(null);
  const [active, setActive] = useState(null);
  const [files, setFiles] = useState(null);
  const [name2, setName2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataApi(`admin-users/${id}`, auth.token);

        setSystemVerification(response?.data?.data?.system_verification);
        setNationalVerification(response?.data?.data?.national_verification);
        setActive(response?.data?.data?.active);
      } catch (error) {}
    };

    fetchData();
  }, [auth.token]);

  const handleDeleteFile = async () => {
    await dispatch(deleteDocument(getId, auth.token));
    dispatch(getOneUser(auth.token, id));
  };

  const inputRef = useRef();

  useEffect(() => {
    dispatch(profile(auth.token));
    dispatch(getOneUser(auth.token, id));
  }, [dispatch, auth.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append(`file[${i}]`, files[0]);
    // }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setName2(e.target.files[0]);
    reader.onload = () => {
      setFiles(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    // console.log(formData);
    // dispatch(postDocument(auth.token, id, formData));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    setName2(e.dataTransfer.files[0]);
    reader.onload = () => {
      setFiles(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setName2("");
    if (files) {
      await dispatch(postDocument(auth.token, id, files));
      dispatch(
        toggleActivation(
          auth.token,
          id,
          systemVerification,
          nationalVerification,
          active
        )
      );
      dispatch(getOneUser(auth.token, id));
      dispatch(profile(auth.token));
    } else {
      dispatch(
        toggleActivation(
          auth.token,
          id,
          systemVerification,
          nationalVerification,
          active
        )
      );
      dispatch(getOneUser(auth.token, id));
      dispatch(profile(auth.token));
    }
  };

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

                <div className="flex mt-[30px]">
                  <div
                    onClick={() => setSystemVerification(!systemVerification)}
                    className={
                      systemVerification === true
                        ? "bg-primary cursor-pointer relative min-w-[40px]  h-[20px] rounded-full"
                        : "bg-gray-300 cursor-pointer relative min-w-[40px]  h-[20px] rounded-full"
                    }
                  >
                    {systemVerification === true ? (
                      <div
                        className={`bg-white h-[16px] w-[16px] rounded-full  ${
                          systemVerification === true
                            ? "translate-x-full absolute top-1/2 transform  -translate-y-1/2 left-[6px]"
                            : "translate-x-0 absolute top-1/2 transform  -translate-y-1/2 left-[2px]"
                        } ease-in-out duration-500`}
                      ></div>
                    ) : (
                      <div
                        className={`bg-white h-[16px] w-[16px] rounded-full  ${
                          systemVerification === false
                            ? "translate-x-0 absolute top-1/2 transform  -translate-y-1/2 left-[2px]"
                            : "translate-x-full absolute top-1/2 transform  -translate-y-1/2 left-[6px]"
                        } ease-in-out duration-500`}
                      ></div>
                    )}
                  </div>
                  <div className="ml-[10px]">
                    <h4 className="font-semibold text-primary">
                      System verification
                    </h4>
                    <h4 className="text-light">
                      System verification button to verify a user
                    </h4>
                  </div>
                </div>

                <div className="flex mt-[30px]">
                  <div
                    onClick={() =>
                      setNationalVerification(!nationalVerification)
                    }
                    className={
                      nationalVerification === true
                        ? "bg-primary cursor-pointer relative min-w-[40px] h-[20px] rounded-full"
                        : "bg-gray-300 cursor-pointer relative min-w-[40px] h-[20px] rounded-full"
                    }
                  >
                    {nationalVerification === true ? (
                      <div
                        className={`bg-white h-[16px] w-[16px] rounded-full  ${
                          nationalVerification === true
                            ? "translate-x-full absolute top-1/2 transform  -translate-y-1/2 left-[6px]"
                            : "translate-x-0 absolute top-1/2 transform  -translate-y-1/2 left-[2px]"
                        } ease-in-out duration-500`}
                      ></div>
                    ) : (
                      <div
                        className={`bg-white h-[16px] w-[16px] rounded-full  ${
                          nationalVerification === false
                            ? "translate-x-0 absolute top-1/2 transform  -translate-y-1/2 left-[2px]"
                            : "translate-x-full absolute top-1/2 transform  -translate-y-1/2 left-[6px]"
                        } ease-in-out duration-500`}
                      ></div>
                    )}
                  </div>
                  <div className="ml-[10px]">
                    <h4 className="font-semibold text-primary">
                      National verification
                    </h4>
                    <h4 className="text-light">
                      National verification button to verify a user
                    </h4>
                  </div>
                </div>

                <div className="md:flex w-full mt-[40px]">
                  <div className="relative w-[64px]">
                    {data?.avatar === null ? (
                      <div className="w-[64px] h-[64px] rounded-full flex justify-center items-center text-primary bg-lighter text-[20px] font-medium uppercase">
                        {data?.initials}
                      </div>
                    ) : (
                      <Avatar
                        width="w-[64px]"
                        height="w-[64px]"
                        src={data?.avatar}
                      />
                    )}
                  </div>
                  <div className="md:ml-[18px] mt-[20px] md:mt-[0px] w-full border-[2px] border-[#E2EFE4] rounded-[8px] flex justify-center items-center py-[16px]">
                    {!name2 ? (
                      <div onDragOver={handleDragOver} onDrop={handleDrop}>
                        <div className="flex justify-center rounded-full w-[40px] h-[40px] items-center bg-lighter mx-auto mb-[12px]">
                          <FiUploadCloud className="text-primary text-[22px]" />
                        </div>
                        <div className="flex justify-center">
                          <h4
                            onClick={() => inputRef.current.click()}
                            className="font-semibold text-primary mr-[6px] cursor-pointer"
                          >
                            Click to upload
                          </h4>
                          <h4 className="text-light">or drag and drop</h4>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept=".png, .jpg, .jpeg, .pdf, .svg, .gif, .doc, .docx"
                          onChange={handleSubmit}
                          name="file"
                          hidden
                          ref={inputRef}
                        />
                        <h4 className="flex justify-center mt-[4px] text-light text-center px-[10px]">
                          SVG, PNG, JPG or GIF (max. 800x400px)
                        </h4>
                      </div>
                    ) : (
                      <div className="px-[20px]">
                        <ol>
                          {/* {Array.from(files).map((file, index) => ( */}
                          <li
                            className="text-primary"
                            //  key={index}
                          >
                            {name2.name}
                          </li>
                          {/* ))} */}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end mt-[40px]">
                  {name2 && (
                    <h4
                      onClick={() => {
                        setFiles(null);
                        setName2("");
                      }}
                      className="border-[2px] border-[#E2EFE4] text-primary px-[16px] py-[10px] rounded-[8px] mr-[15px] font-semibold cursor-pointer"
                    >
                      Cancel
                    </h4>
                  )}

                  <button className=" text-white bg-primary px-[16px] py-[10px] rounded-[8px] ">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {document?.map((file) => (
        <div key={file.id} className="mt-[20px] relative">
          <button
            onClick={() => {
              setDeleteFile(!deleteFile);
              setGetId(file);
            }}
            className="absolute bg-red-500 right-[30px] top-[8px] z-30 text-[16px] text-white w-[100px] py-[5px] rounded-[8px] hover:bg-red-600"
          >
            Delete
          </button>
          <DocViewer
            documents={[{ uri: file.file_url }]}
            pluginRenderers={DocViewerRenderers}
            theme={{
              primary: "#638B68",
              secondary: "#ffffff",
              tertiary: "#0A5438",
              textPrimary: "#ffffff",
              textSecondary: "#ffffff",
              textTertiary: "#00000099",
              disableThemeScrollbar: false,
            }}
          />
        </div>
      ))}
      {deleteFile && (
        <div
          className="fixed center w-full h-full"
          style={{
            background: "#0007",
            color: "white",
            top: 0,
            left: 0,
            zIndex: 100,
          }}
        >
          <div className=" justify-center bg-white p-[20px] rounded-[8px]">
            <div>
              <h4 className="text-primary">
                Are you sure you want to delete this file?
              </h4>
            </div>
            <div className="flex justify-between mt-[30px]">
              <button
                onClick={() => {
                  setDeleteFile(!deleteFile);
                  handleDeleteFile();
                }}
                className=" bg-red-500 text-[16px] text-white w-[100px] py-[5px] rounded-[8px] hover:bg-red-600"
              >
                Delete file
              </button>
              <button
                onClick={() => setDeleteFile(!deleteFile)}
                className=" bg-primary text-[16px] text-white w-[100px] py-[5px] rounded-[8px] hover:bg-lime-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
