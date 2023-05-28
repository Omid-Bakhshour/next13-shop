import React from "react";

function Progress({ value, active, scrollTo }) {
  return (
    <progress
      onClick={scrollTo}
      value={value}
      max={100}
      className={`progress overflow-hidden bg-gray-500  h-1 rounded-2xl cursor-pointer ${
        active ? "w-10 lg:w-28" : "w-3 lg:w-5"
      } `}
    />
  );
}

export default Progress;
