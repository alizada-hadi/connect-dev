import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const SearchBox = ({ placeholder, path }) => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (query) {
      if (path) {
        navigate(`/${path}/?query=${query}`);
      } else {
        navigate(`/?query=${query}`);
      }
    } else {
      navigate("/");
    }
  };
  return (
    <form
      onSubmit={submitHandler}
      className="w-full px-10 flex-col flex gap-3 md:flex-row md:px-0 items-center justify-center mt-4 md:mt-16"
    >
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-[25rem] lg:w-[35rem] h-16 rounded-lg text-lg pl-3 focus:outline-none focus:ring focus:ring-blue-300 dark:text-slate-200 dark:bg-gray-800"
        placeholder={
          placeholder ? placeholder : "Search by names, skills, projects"
        }
      />
      <button className="h-16 bg-white w-full md:w-48 md:ml-1 hover:border-2 border-slate-700 dark:hover:border-slate-200 rounded-lg text-xl flex items-center justify-center dark:text-slate-200 dark:bg-gray-800">
        <span>Search</span>
        <AiOutlineSearch className="ml-2 text-2xl" />
      </button>
    </form>
  );
};

export default SearchBox;
