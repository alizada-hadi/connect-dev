import React from "react";
import { useSelector } from "react-redux";

const Badge = ({ item, bgColor }) => {
  const { theme } = useSelector((state) => state.UI);

  return (
    <div
      className={`rounded text-md text-center justify-center mr-2 px-2.5 py-0.5 my-1 inline-flex items-center`}
      style={{
        backgroundColor: theme ? "#1e293b" : `${bgColor}`,
        color: theme ? "#e2e8f0" : "#1e293b",
      }}
    >
      {item}
    </div>
  );
};

export default Badge;
