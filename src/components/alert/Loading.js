import React from "react";
import load from "../../assets/load.png";

const Loading = () => {
  return (
    <div
      className="fixed loading w-full h-full"
      style={{
        background: "#0007",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div className="flex justify-center ">
        <div>
          <div>
            <img className="w-[100px]" src={load} />
          </div>
          <h4
            className="text-primary flex justify-center mt-[10px] text-[20px] font-bold"
            fill="#fff"
            x="5"
            y="45"
          >
            Loading...
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Loading;
