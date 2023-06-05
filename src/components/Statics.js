import React from "react";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";

const Statics = ({ name, current, percentage, previous }) => {
  return (
    <div>
      <div className="px-[17px] py-[15px] border-[1px] border-gray-300 rounded-[10px] flex items-end justify-between">
        <div>
          <h4 className="uppercase md:text-[18px] text-[16px] xl:text-gray-500 text-primary">
            {name}
          </h4>
          <h4 className="mt-[11px] md:text-[28px] text-[22px] font-bold xl:text-black text-primary">
            {current}
          </h4>
        </div>
        <div className="flex items-center ">
          {current > previous && (
            <h4 className="text-green-500 font-medium mr-[6px] text-[17px]">
              +{percentage}%
            </h4>
          )}
          {previous > current && (
            <h4 className="text-red-400 font-medium mr-[6px] text-[17px]">
              -{percentage}%
            </h4>
          )}

          {current > previous && (
            <BsArrowUp className="text-green-500 stroke-[0.5px]" />
          )}
          {previous > current && (
            <BsArrowDown className="text-red-400 stroke-[0.5px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Statics;
