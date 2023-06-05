import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Transaction from "../components/Transaction";
import { HiFilter } from "react-icons/hi";
import { HiArrowUp } from "react-icons/hi";
import { BiPlus } from "react-icons/bi";
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from "react-redux";
import { getTransaction } from "../redux/actions/transactionAction";
import { profile } from "../redux/actions/profileAction";

const Transactions = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState(false);

  const { auth, transaction, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const status = 10;
  const show = transaction?.transaction?.status;

  const getPage = async (pageNumber) => {
    dispatch(
      getTransaction(auth.token, status, show, pageNumber, id, amount, title)
    );
  };

  const pageNumber2 = 1;
  const getFilter = async () => {
    dispatch(
      getTransaction(auth.token, status, show, pageNumber2, id, amount, title)
    );
  };

  const show2 = "";
  const pageNumber = 1;

  useEffect(() => {
    getPage();

    dispatch(
      getTransaction(auth.token, status, show2, pageNumber, id, amount, title)
    );
    dispatch(profile(auth.token));
  }, [dispatch, auth.token, show2]);
  return (
    <div className="lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white w-full md:py-[38px] md:px-[64px] px-[16px] py-[12px]  h-[calc(100vh)] overflow-y-auto overflow-x-auto no-scrollbar">
      <div className="flex items-center">
        <h4 className="text-primary text-[24px] font-semibold hidden md:block">
          Transactions
        </h4>
        <div className="relative md:ml-[69px] mx-[27px] w-full">
          <input
            className="relative py-[4px] pl-[30px] placeholder:text-gray-300 placeholder:text-[18px] border-b-[1px] border-gray-300 md:w-[80%] w-[100%] outline-primary focus:outline-none focus:border-b-primary focus:bg-lime-50 text-primary"
            type="text"
            name="search"
            placeholder="Search anything"
          />
          <IoSearchOutline className="absolute left-0 top-[6px] text-gray-400 text-[20px]" />
        </div>
      </div>
      <div className="md:mt-[70px] mt-[50px] mb-[22px] flex justify-end ">
        <button
          onClick={() => setFilter(!filter)}
          className="flex items-center text-primary border-[1px] border-gray-[200] px-[12px] py-[4px] rounded-[5px] hover:bg-lime-100 mr-[10px] relative"
        >
          <HiFilter className="mr-[8px] text-[18px]" />
          Filter
          <div className="text-white bg-red-400 w-[22px] h-[22px] flex justify-center items-center rounded-full absolute -right-[10px] -top-[10px] border-[2px] border-white text-[14px]">
            1
          </div>
        </button>

        <button className="flex items-center text-primary border-[1px] border-gray-[200] px-[12px] py-[4px] rounded-[5px] hover:bg-lime-100">
          <HiArrowUp className="mr-[8px] text-[18px]" />
          Export
        </button>
        {/* <button className="flex items-center bg-primary hover:bg-lime-900 border-[1px] border-gray-[200] px-[12px] py-[4px] rounded-[5px]  text-white">
          <BiPlus className="mr-[8px] text-[18px] " />
          Create payment
        </button> */}
      </div>
      {filter === true ? (
        <div className="mt-[24px] mb-[32px] flex justify-end">
          <div className="  md:w-[360px] ">
            <div>
              <div className="flex justify-center">
                <input
                  className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                  autoComplete="on"
                  name="id"
                  type="text"
                  value={id}
                  placeholder="Enter id "
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-[24px]">
              <div className="flex justify-center relative">
                <input
                  className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                  autoComplete="on"
                  name="amount"
                  type="number"
                  value={amount}
                  placeholder="Enter amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-[24px]">
              <div className="flex justify-center relative">
                <input
                  className=" border border-light w-full placeholder:text-[14px] placeholder:text-light px-[14px] py-[10px] rounded-[8px] outline-primary text-primary focus:bg-lime-50"
                  autoComplete="on"
                  name="title"
                  type="text"
                  value={title}
                  placeholder="Enter title"
                  onChange={(e) =>
                    setTitle(
                      e.target.value.replace(/(^\w|\s\w)/g, (m) =>
                        m.toUpperCase()
                      )
                    )
                  }
                />
              </div>
            </div>
            <button
              onClick={getFilter}
              className="w-full py-[12px] text-[16px] font-semibold bg-primary text-white rounded-[8px] mt-[24px] hover:bg-lime-800"
            >
              Filter
            </button>
          </div>
        </div>
      ) : null}
      <Transaction
        status={10}
        height="md:h-[calc(70vh-10.75rem)] h-[calc(80vh-10.75rem)]"
      />
      <div
        className={
          transaction.transaction === [] ||
          transaction.loading === true ||
          alert.loading === true ||
          transaction?.transaction?.meta?.total <= 10
            ? "hidden"
            : "flex justify-center text-lg mb-16 "
        }
      >
        <Pagination
          activePage={transaction?.transaction?.meta?.current_page}
          totalItemsCount={transaction?.transaction?.meta?.total}
          itemsCountPerPage={transaction?.transaction?.meta?.per_page}
          onChange={getPage}
          itemClass="text-primary border-[1px] border-primary w-[50px] h-[30px] flex justify-center items-center cursor-pointer hover:bg-light hover:text-lighter"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
          itemClassFirst={
            transaction?.transaction?.meta?.current_page === 1
              ? "hidden"
              : " text-[16px] font-medium text-white bg-primary cursor-pointer "
          }
          itemClassLast={
            transaction?.transaction?.meta?.current_page ===
            transaction?.transaction?.meta?.last_page
              ? "hidden"
              : " text-[16px] font-medium text-white bg-primary cursor-pointer "
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

export default Transactions;
