import React, { useState, useEffect } from "react";
import { HiCheck } from "react-icons/hi";
import { TbRotateClockwise2 } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getTransaction } from "../redux/actions/transactionAction";
import LoadIcon from "../assets/loading.gif";

const Table = ({ show, visible, status, id, amount, title, pageNumber }) => {
  const { transaction, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // console.log(show);
  // const pageNumber = transaction?.transaction?.pageNumber;
  // const status2 = transaction?.transaction?.status;

  useEffect(() => {
    dispatch(
      getTransaction(auth.token, status, show, pageNumber, id, amount, title)
    );
  }, [dispatch, auth.token]);

  return (
    <div className="">
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
              <td>ID</td>
              <td className="text-end">AMOUNT</td>
              <td className="text-end">TOTAL</td>
              <td></td>
              <td>TITLE</td>
              <td>TYPE</td>
              <td>CREATED</td>
              <td>UPDATED</td>
            </tr>
          </thead>

          {transaction?.transaction?.data &&
          transaction?.transaction?.data?.length
            ? transaction?.transaction?.data?.map((data) => (
                <tbody key={data.id} className=" ">
                  <tr
                    className={
                      data.status === `${show}`
                        ? "text-[16px] text-primary border-b-[1px] border-gray-200"
                        : `${visible} text-[16px] text-primary border-b-[1px] border-gray-200`
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
                      <h4 className="w-max">{data.id}</h4>
                    </td>
                    <td className="text-end">
                      ₦{data.amount_paid.toLocaleString("en-US")}
                    </td>
                    <td className="text-end">
                      ₦{data.total.toLocaleString("en-US")}
                    </td>
                    <td className="flex justify-center">
                      {data.status === "Sucesssful" && (
                        <div
                          className={`flex items-center justify-center py-[2px] px-[8px] bg-lighter text-green-600 rounded-[5px] w-[120px]`}
                        >
                          <HiCheck className="text-[20px]" />
                          <h4 className="font-semibold ml-[8px]">
                            {data.status}
                          </h4>
                        </div>
                      )}
                      {data.status === "Pending" && (
                        <div
                          className={`flex items-center justify-center py-[2px] px-[8px] bg-gray-200 text-gray-600 rounded-[5px] w-[120px]`}
                        >
                          <TbRotateClockwise2 className="text-[20px]" />
                          <h4 className="font-semibold ml-[8px]">
                            {data.status}
                          </h4>
                        </div>
                      )}
                      {data.status === "Paid" && (
                        <div
                          className={`flex items-center justify-center py-[2px] px-[8px] bg-blue-200 text-blue-600 rounded-[5px] w-[120px]`}
                        >
                          <HiCheck className="text-[20px]" />
                          <h4 className="font-semibold ml-[8px]">
                            {data.status}
                          </h4>
                        </div>
                      )}
                    </td>
                    <td className="">
                      <h4 className="w-max">{data.title}</h4>
                    </td>
                    <td>{data.type}</td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
        </table>
        {transaction.loading && (
          <div className=" flex justify-center w-2/3 mx-auto my-[100px]">
            <img className="mx-auto w-[40px]" src={LoadIcon} alt="loading" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
