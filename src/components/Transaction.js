import React, { useState } from "react";
import Table from "./Table";

const Transaction = ({ height, status, search }) => {
  const Menus = [
    {
      name: "All",
      dis: "translate-x-0",
      width: "w-[20px]",
      font: "font-semibold",
    },
    {
      name: "Succeeded",
      dis: "translate-x-[49px]",
      width: "w-[78px]",
      font: "font-semibold",
      show: "block",
    },
    {
      name: "Pending",
      dis: "translate-x-[155px]",
      width: "w-[58px]",
      font: "font-semibold",
    },
    {
      name: "Paid",
      dis: "translate-x-[243px]",
      width: "w-[30px]",
      font: "font-semibold",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className={``}>
      <ul className="flex relative mb-[10px]">
        {Menus.map((menu, i) => (
          <li key={i} className="flex mr-[30px]">
            <h4
              className={`cursor-pointer text-light ${
                i === active && "font-semibold text-primary"
              }`}
              onClick={() => setActive(i)}
            >
              {menu.name}
            </h4>
          </li>
        ))}
      </ul>
      <div className="bg-gray-200 w-full h-[2px] ">
        <ul className="flex relative rounded-full">
          <div
            className={` duration-500 ${Menus[active].dis}  border-2 border-primary ${Menus[active].width} absolute
            `}
          ></div>
        </ul>
      </div>
      <div className={` overflow-x-auto mt-[20px] ${height}`}>
        {Menus[active].name === "All" && (
          <Table
            show=""
            visible="visible"
            status={status}
            id=""
            amount=""
            title=""
            pageNumber={1}
            search={search}
          />
        )}
        {Menus[active].name === "Succeeded" && (
          <Table
            show="Sucesssful"
            visible="hidden"
            status={status}
            id=""
            amount=""
            title=""
            pageNumber={1}
            search={search}
          />
        )}
        {Menus[active].name === "Pending" && (
          <Table
            show="Pending"
            visible="hidden"
            status={status}
            id=""
            amount=""
            title=""
            pageNumber={1}
            search={search}
          />
        )}
        {Menus[active].name === "Paid" && (
          <Table
            show="Paid"
            visible="hidden"
            status={status}
            id=""
            amount=""
            title=""
            pageNumber={1}
            search={search}
          />
        )}
      </div>
    </div>
  );
};

export default Transaction;
