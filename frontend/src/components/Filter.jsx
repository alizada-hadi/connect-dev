import React from "react";
import { useNavigate } from "react-router-dom";
const Filter = ({ item, path }) => {
  const navigate = useNavigate();
  const filterHandler = (keyword) => {
    if (keyword) {
      if (path) {
        navigate(`/${path}/?query=${keyword}`);
      } else {
        navigate(`/?query=${keyword}`);
      }
    }
  };
  return (
    <div
      onClick={() => {
        filterHandler(path ? item.first_name : item);
      }}
      className="py-2 px-4 mx-1 border my-1 cursor-pointer rounded-md text-center text-md shadow-inner hover:shadow-md dark:bg-slate-700 dark:text-slate-200"
    >
      {path ? (
        <div className="flex items-center space-x-2">
          <img src={item.avatar} className="w-8 h-8 rounded-full" alt="" />
          <span>{item.first_name}</span>
        </div>
      ) : (
        item
      )}
    </div>
  );
};

export default Filter;
