import React from "react";
import { useSelector } from "react-redux";
import profile from "../assets/profile.jpeg";

function Avatar({ src, width, height }) {
  return (
    <div
      className={`relative ${width} ${height} overflow-hidden bg-gray-100 rounded-full`}
    >
      <img src={src} />
    </div>
  );
}

export default Avatar;
