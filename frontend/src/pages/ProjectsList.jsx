import React, { useEffect } from "react";
import { fetchProjects } from "../features/projects/projectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProgrammers } from "../features/programmer/programmerSlice";
import Spinner from "../components/Spinner";
import ProjectCard from "../components/ProjectCard";
import SearchBox from "../components/SearchBox";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { projects, status } = useSelector((state) => state.projects);
  const { programmers } = useSelector((state) => state.programmers);

  const query = location.search;
  useEffect(() => {
    dispatch(fetchProjects(query));
    dispatch(fetchProgrammers());
  }, [dispatch, query]);

  return status === "loading" ? (
    <Spinner />
  ) : (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="pt-12">
        <div className="h-80 bg-slate-100 dark:bg-slate-700">
          <h1 className="text-center font-Roboto text-5xl pt-10 capitalize dark:text-slate-200">
            programmers best{" "}
            <span className="uppercase font-bold leading-10">Projects</span>
          </h1>
          <SearchBox
            placeholder="Search projects by developer name"
            path="projects"
          />
        </div>
      </div>

      <div className="mx-12 md:mx-24 lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-4  gap-2 mt-6">
          <div className="">
            <h1 className="capitalize text-2xl mb-4 font-medium font-Roboto text-gray-600 mr-10 dark:text-slate-200">
              Filter projects by their creator
            </h1>
            <div className="grid grid-cols-3">
              {programmers?.results?.map((programmer, index) => (
                <Filter key={index} item={programmer} path="projects" />
              ))}
            </div>
          </div>
          <div className="md:col-start-2 md:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {projects?.results?.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>

            <Pagination items={projects} path="projects" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
