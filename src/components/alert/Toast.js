import React from "react";

function Toast({ msg, handleShow, bgColor, textColor, border }) {
  setTimeout(() => {
    handleShow();
  }, 3000);
  return (
    <div
      className={` fixed w-full h-full flex justify-center `}
      style={{
        minWidth: "200px",
        zIndex: 50,
        background: "#0007",
        color: "white",
        top: 0,
        left: 0,
      }}
    >
      <div
        className={`bg-white rounded-[7px] p-[15px] md:w-[400px] h-fit mt-[16px] w-full mx-[16px] md:mx-[0px] ${border} border-l-[4px]`}
      >
        <div className={`flex justify-between items-center  `}>
          <strong className={`${textColor} text-[20px] tracking-wider`}>
            {msg.title}
          </strong>
          <button
            data-dismiss="toast text-black"
            className="text-[35px] text-black "
            style={{ outline: "none" }}
            onClick={handleShow}
          >
            &times;
          </button>
        </div>
        <div className={`mt-[15px] ${textColor} text-[18px]`}>{msg.body}</div>
      </div>
    </div>
  );
}

export default Toast;
