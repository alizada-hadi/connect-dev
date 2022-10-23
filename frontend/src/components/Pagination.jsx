import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ items, path }) => {
  const next = items && items.next ? items.next.split("?") : "";
  const prev = items && items.previous ? items.previous.split("?") : "";

  return (
    <div className="flex flex-col items-center my-8">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {items ? items?.results?.length : 0}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {items ? items?.results?.length : 0}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {items ? items?.count : 0}
        </span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <Link
          to={path ? `/${path}` : `/`}
          style={{ pointerEvents: items.previous ? "" : "none" }}
          className="inline-flex items-center py-2 px-4 text-sm font-medium border text-slate-800 bg-white rounded-l hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border-gray-400 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="mr-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Prev
        </Link>
        <Link
          to={path ? `/${path}/?${next[1]}` : `/?${next[1]}`}
          style={{ pointerEvents: items.next ? "" : "none" }}
          className="inline-flex items-center py-2 px-4 text-sm  font-medium text-slate-800 bg-white rounded-r border border-l border-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            aria-hidden="true"
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
