import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import Chart from "react-apexcharts";
import Statics from "../components/Statics";
import Table from "../components/Table";
import Transaction from "../components/Transaction";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../redux/actions/profileAction";
import { getDashboard } from "../redux/actions/dashboardAction";
import { getTransaction } from "../redux/actions/transactionAction";
import { getDataApi, logoutApi } from "../utils/fetchData";

const Dashboard = () => {
  const { auth, dashboard, transaction } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const status = 5;
  const show = "";
  const pageNumber = 1;
  const id = "";
  const amount = "";
  const title = "";

  // const userId = async () => {
  //   const res = await getDataApi(
  //     `admin-users/9956b79d-7280-47cb-bb7c-0d501ade30eb
  //     `,
  //     auth.token
  //   );
  //   console.log(res);
  // };

  useEffect(() => {
    dispatch(profile(auth.token));
    dispatch(getDashboard(auth.token));
    dispatch(
      getTransaction(
        auth.token,
        status,
        show,
        pageNumber,
        id,
        amount,
        title,
        search
      )
    );
    // userId();
    // transact();
  }, [dispatch, search]);

  return (
    <div className="lg:rounded-l-[50px] lg:rounded-tr-[0px] rounded-t-[40px] bg-white w-full md:py-[38px] md:px-[64px] px-[16px] py-[12px]  h-[calc(100vh)] overflow-y-auto overflow-x-auto ">
      <div className="flex items-center">
        <h4 className="text-primary text-[24px] font-semibold hidden md:block">
          Dashboard
        </h4>
        <div className="relative md:ml-[69px] mx-[27px] w-full">
          <input
            className="relative py-[4px] pl-[30px] placeholder:text-gray-300 placeholder:text-[18px] border-b-[1px] border-gray-300 md:w-[80%] w-[100%] outline-primary focus:outline-none focus:border-b-primary focus:bg-lime-50 text-primary"
            type="text"
            name="search"
            placeholder="Search anything"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoSearchOutline className="absolute left-0 top-[6px] text-gray-400 text-[20px]" />
        </div>
      </div>
      <div className="md:mt-[64px] mt-[24px] grid xl:grid-cols-3 grid-cols-1">
        <div
          className="xl:col-start-1 xl:col-end-3 xl:border-r-[1px] 
         xl:border-light xl:pr-[15px] 2xl:pr-[25px] "
        >
          <h4 className="text-primary md:text-[22px] text-[18px] font-semibold">
            Transaction report
          </h4>
          {/* <div className="flex items-center md:mt-[12px] mt-[5px] text-primary mb-[25px] md:mb-[0px]">
            <h4 className="md:text-[18px] text-[14px] font-medium">
              showing for:
            </h4>
            <MdOutlineDateRange className="w-[16px] mx-[6px]" />
            <h4 className="md:text-[14px] text-[12px] font-medium">
              Mar 1 - mar 19, 2023
            </h4>
          </div> */}
          <div>
            <Chart
              options={{
                chart: {
                  height: 350,
                  type: "area",
                },
                dataLabels: {
                  enabled: false,
                },
                colors: ["#0A5438"],
                fill: {
                  type: "gradient",
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100],
                  },
                },

                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  categories: dashboard?.dashboard?.report?.month,
                },

                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
              }}
              series={[
                {
                  name: "Series 1",
                  data: dashboard?.dashboard?.report?.amount,
                },
              ]}
              height={350}
              type="area"
            />
          </div>
        </div>
        <div className=" xl:col-start-3 xl:col-end-4 xl:pl-[20px] 2xl:pl-[40px]">
          <div className="flex justify-between items-center xl:mb-[36px] mb-[12px]">
            <h4 className="text-primary text-[24px] font-semibold">Statics</h4>
            <div className="flex items-center mt-[12px] text-primary">
              <MdOutlineDateRange className="w-[16px] mr-[6px]" />
              <h4 className="text-[14px] font-semibold">Last 30 days</h4>
            </div>
          </div>
          <div className="grid grid-cols-1 md:gap-[32px] gap-[16px]">
            <Statics
              name="TOTAL TRANSACTION"
              current={dashboard?.dashboard?.stats?.total_transactions?.current}
              previous={
                dashboard?.dashboard?.stats?.total_transactions?.previous
              }
              percentage={
                dashboard?.dashboard?.stats?.total_transactions?.percentage
              }
            />
            <Statics
              name="TOTAL REVENUE"
              current={`₦ ${dashboard?.dashboard?.stats?.total_revenue?.current.toLocaleString(
                "en-US"
              )}`}
              previous={dashboard?.dashboard?.stats?.total_revenue?.previous}
              percentage={
                dashboard?.dashboard?.stats?.total_revenue?.percentage
              }
            />
            <Statics
              name="TOTAL CUSTOMERS"
              current={dashboard?.dashboard?.stats?.total_customers?.current}
              previous={dashboard?.dashboard?.stats?.total_customers?.previous}
              percentage={
                dashboard?.dashboard?.stats?.total_customers?.percentage
              }
            />
            <Statics
              name="TOTAL PROFIT"
              current={`₦ ${dashboard?.dashboard?.stats?.total_profit?.current.toLocaleString(
                "en-US"
              )}`}
              previous={dashboard?.dashboard?.stats?.total_profit?.previous}
              percentage={dashboard?.dashboard?.stats?.total_profit?.percentage}
            />
          </div>
        </div>
      </div>

      <div className="mb-[20px]">
        <h4 className="font-semibold text-[24px] text-primary mb-[23px] mt-[18px] xl:mt-[0px]">
          Recent transactions
        </h4>
      </div>
      <Transaction status={5} search={search} />
      <NavLink to="/transactions">
        <button className="font-semibold text-primary mt-[15px]">
          View all Transcations
        </button>
      </NavLink>
    </div>
  );
};

export default Dashboard;
