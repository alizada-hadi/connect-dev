import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProgrammerDetail = () => {
  const { id } = useParams();
  const { programmers } = useSelector((state) => state.programmers);
  const { user } = useSelector((state) => state.auth);
  const programmer = programmers?.results?.find((item) => item.id == id);

  function createConversationName(programmer) {
    const namesAlph = [user?.username, programmer.first_name].sort();
    return `${namesAlph[0]}-${namesAlph[1]}`;
  }

  return (
    <div className=" dark:bg-gray-800">
      <div className="pt-12 mx-12 md:mx-24 lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-2 mt-12">
          <div className="border-2 rounded-lg px-3 py-4 dark:bg-slate-700 max-h-[35rem] ">
            <div className="flex flex-col items-center justify-center">
              <div>
                <img
                  src={programmer?.avatar}
                  className="mx-auto rounded-full w-48 h-48 border-2 border-emerald-800 my-6"
                  alt=""
                />
                <h1 className="text-3xl text-center dark:text-slate-200 font-bold mt-5">
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
              <Link
                to={`/conversation/${createConversationName(programmer)}`}
                className="border w-full text-center rounded-lg py-3 bg-slate-700 text-slate-200 hover:bg-slate-50 hover:text-slate-800 transition ease-out duration-300 text-xl"
              >
                Send Message
              </Link>
            </div>
          </div>
          <div className="lg:col-start-2 lg:col-span-4 ml-10">
            <div className="dark:text-slate-200">
              <h1 className="text-4xl uppercase mb-2 leading-8 font-bold">
                About
              </h1>
              <p className="text-gray-600 text-xl indent-8 text-justify dark:text-slate-200">
                {programmer.about}
              </p>
            </div>

            <div className="dark:text-slate-200 mt-8 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl uppercase mb-2 leading-8 font-bold">
                    Skills
                  </h1>
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
                              <Link to={`/project/${project?.slug}`}>
                                {project?.title}
                              </Link>
                            </h1>
                            <p className="text-justify text-lg text-gray-600 dark:text-slate-200">
                              {project?.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
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

export default ProgrammerDetail;
