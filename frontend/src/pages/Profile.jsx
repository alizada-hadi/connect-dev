import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BsGithub, BsTwitter, BsLinkedin, BsTrash } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import {
  fetchProgrammers,
  resetSkill,
  deleteSkill,
} from "../features/programmer/programmerSlice";

import {
  fetchProjects,
  deleteProject,
} from "../features/projects/projectsSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, access } = useSelector((state) => state.auth);
  const { programmers } = useSelector((state) => state.programmers);
  useEffect(() => {
    dispatch(fetchProgrammers());
    dispatch(fetchProjects());
    dispatch(resetSkill());
  }, [dispatch]);

  const programmer = programmers?.results?.find(
    (programmer) => programmer.id === user?.programmer?.id
  );

  // custom hooks

  const skillDeleteHandler = (slug) => {
    const token = access.access;
    const data = { slug, token };
    const prompt = window.confirm(
      "Are you suer you want to delete this skill "
    );
    if (prompt) {
      dispatch(deleteSkill(data));
      dispatch(fetchProgrammers());
    }
  };

  const projectDeleteHandler = (slug) => {
    const token = access.access;
    const data = { slug, token };
    const qs = window.confirm("Are you sure you want to delete this project? ");
    if (qs) {
      dispatch(deleteProject(data));
      dispatch(fetchProjects());
      dispatch(fetchProgrammers());
    }
  };

  return status === "loading" ? (
    <Spinner />
  ) : (
    <div className="pt-12 bg-white dark:bg-gray-800 ">
      <div className="mx-12 md:mx-24 lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4  gap-2 mt-12">
          <div className="border-2 rounded-lg px-3 py-4 dark:bg-slate-700 max-h-[40rem] ">
            <div className="flex flex-col items-center justify-center">
              <div className="my-5 ">
                <Link
                  to={`/${user?.id}`}
                  className="flex items-center px-2 py-1 border rounded-full bg-green-200 dark:bg-gray-800 dark:text-slate-200"
                >
                  <BiEdit className="mr-2 text-xl" />
                  <span>Edit</span>
                </Link>
              </div>
              <div>
                <img
                  src={programmer?.avatar}
                  className="mx-auto rounded-full w-48 h-48 border-2 border-emerald-800 my-4"
                  alt=""
                />
                <h1 className="text-3xl text-center dark:text-slate-200 font-bold">
                  {programmer?.first_name} {programmer?.last_name}
                </h1>
                <p className="text-xl text-gray-500 dark:text-slate-200 font-medium capitalize text-center my-3">
                  {programmer?.speciality}
                </p>
                <p className="text-center font-medium dark:text-slate-200">
                  Lives in - {programmer?.address}
                </p>

                <div className="my-10 flex items-center justify-evenly dark:text-slate-200">
                  {programmer?.git ? (
                    <a
                      href={`${programmer?.git}/`}
                      className="text-4xl text-blue-900 dark:text-slate-200"
                    >
                      <BsGithub />
                    </a>
                  ) : (
                    ""
                  )}
                  {programmer?.twitter ? (
                    <a
                      href={`${programmer?.twitter}`}
                      className="text-4xl text-blue-900 dark:text-slate-200"
                    >
                      <BsTwitter />
                    </a>
                  ) : (
                    ""
                  )}
                  {programmer?.website ? (
                    <a
                      href={`${programmer?.website}/`}
                      className="text-4xl text-blue-900 dark:text-slate-200"
                    >
                      <FaGlobeAmericas />
                    </a>
                  ) : (
                    ""
                  )}

                  {programmer?.linkedIn ? (
                    <a
                      href={`${programmer?.linkedIn}/`}
                      className="text-4xl text-blue-900 dark:text-slate-200"
                    >
                      <BsLinkedin />
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-start-2 lg:col-span-4 ml-10">
            <div className="dark:text-slate-200">
              <h1 className="text-4xl uppercase mb-2 leading-8 font-bold">
                About
              </h1>
              <p className="text-gray-600 text-xl indent-8 text-justify dark:text-slate-200">
                {programmer?.about}
              </p>
            </div>

            <div className="dark:text-slate-200 mt-8 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl uppercase mb-2 leading-8 font-bold">
                    Skills
                  </h1>
                </div>
                <div>
                  <Link
                    to={`/new/skill`}
                    className="flex items-center px-4 py-1 border rounded-full bg-green-200 dark:bg-gray-800 dark:text-slate-200"
                  >
                    <AiOutlinePlus className="mr-2 text-xl" />
                    <span>Add Skill</span>
                  </Link>
                </div>
              </div>
              <div className="mt-6 mb-6 max-w-4xl  border rounded-lg bg-white p-7 dark:bg-slate-700">
                {programmer?.skills.map((skill, index) => (
                  <div key={index} className="border-b py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h2 className="text-2xl">{skill.title}</h2>
                          <span className="ml-2 text-xs bg-green-200 p-2 rounded-full dark:bg-gray-800 dark:border dark:border-slate-200">
                            {skill.level_of_mastery}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Link
                          to={`/skill/${skill.slug}`}
                          className="mr-3 flex items-center bg-green-200 rounded-full px-2 hover:shadow-md dark:bg-green-900"
                        >
                          <BiEdit className="text-3xl p-1 " />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => skillDeleteHandler(skill.slug)}
                          className="flex items-center bg-red-300 rounded-full px-2 hover:shadow-md dark:bg-red-800"
                        >
                          <MdOutlineCancel className="text-3xl p-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-justify mt-3">{skill.description}</p>
                  </div>
                ))}
              </div>
              {/* projects */}

              <div className="dark:text-slate-200 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl uppercase mb-2 leading-8 font-bold">
                      Projects
                    </h1>
                  </div>
                  <div>
                    <Link
                      to={`/new/project`}
                      className="flex items-center px-4 py-1 border rounded-full bg-green-200 dark:bg-gray-800 dark:text-slate-200"
                    >
                      <AiOutlinePlus className="mr-2 text-xl" />
                      <span>Add Project</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="my-6 max-w-4xl border rounded-lg bg-white p-7 dark:bg-slate-700">
                {programmer?.projects.map((project, index) => (
                  <div key={index} className=" border-b py-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex">
                          <div>
                            <img
                              src={project?.cover_photo}
                              className="w-48 h-32 rounded-lg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <h1 className="text-2xl text-blue-500">
                              <Link to={""}>{project?.title}</Link>
                            </h1>
                            <p className="text-justify text-lg text-gray-600 dark:text-slate-200">
                              {project?.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          to={`/project/edit/${project?.slug}`}
                          className="mr-3 flex items-center bg-green-200 rounded-full px-2 hover:shadow-md dark:bg-green-900"
                        >
                          <BiEdit className="text-3xl p-1" />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={(e) => projectDeleteHandler(project?.slug)}
                          className="flex items-center mt-2 bg-red-300 rounded-full px-2 hover:shadow-md dark:bg-red-800"
                        >
                          <MdOutlineCancel className="text-3xl p-1" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
