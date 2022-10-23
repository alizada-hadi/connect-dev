import React, { useEffect, useState } from "react";
import { fetchProgrammers } from "../features/programmer/programmerSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../features/skills/skillsSlice";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = location.search;

  const { programmers, status } = useSelector((state) => state.programmers);
  const { skills } = useSelector((state) => state.skills);
  let [uniqueSkill, setUniqueSkill] = useState([]);
  useEffect(() => {
    dispatch(fetchProgrammers(query));

    const items = [];
    for (let i = 0; i < skills.length; i++) {
      items.push(skills[i].title);
    }
    const unique = [...new Set(items)];
    setUniqueSkill(unique);
  }, [dispatch, query]);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  return status === "loading" ? (
    <Spinner />
  ) : (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="pt-12">
        <div className="h-80 bg-slate-100 dark:bg-slate-700">
          <h1 className="text-center font-Roboto text-5xl pt-10 capitalize dark:text-slate-200">
            We are connecting the{" "}
            <span className="uppercase font-bold leading-10">programmers</span>
          </h1>
          <SearchBox />
        </div>
      </div>
      <div className="mx-12 md:mx-24 lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-4  gap-2 mt-6">
          <div className="mr-12">
            <h1 className="capitalize text-2xl mb-4 font-medium font-Roboto text-gray-600 mr-10 dark:text-slate-200">
              Filter by skills
            </h1>
            <div className="grid grid-cols-3">
              {uniqueSkill?.map((skill, index) => (
                <Filter key={index} item={skill} />
              ))}
            </div>
          </div>
          <div className="md:col-start-2 md:col-span-4 mb-10">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {programmers?.results?.map((programmer, index) => (
                  <Card key={index} programmer={programmer} />
                ))}
              </div>
            </div>
            <Pagination items={programmers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
