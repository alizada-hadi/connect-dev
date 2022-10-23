import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  updateProject,
  resetProject,
  fetchProjects,
} from "../features/projects/projectsSlice";

const EditProject = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { access } = useSelector((state) => state.auth);
  const { projects, status: projectStatus } = useSelector(
    (state) => state.projects
  );

  const project = projects?.results?.find((project) => project.slug === slug);
  let techLength = 0;
  const [title, setTitle] = useState(project ? project?.title : "");
  const [description, setDescription] = useState(
    project ? project?.description : ""
  );
  const [live_preview_link, setLive_preview_link] = useState(
    project ? project?.live_preview_link : ""
  );
  const [source_code_link, setSource_code_link] = useState(
    project ? project?.source_code_link : ""
  );
  const [cover_photo, setCover_photo] = useState(
    project ? project?.cover_photo : ""
  );
  const [tools, setTools] = useState(project ? project?.techs : []);

  techLength = tools?.length;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setCover_photo(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = access.access;
    const data = {
      title,
      description,
      live_preview_link,
      source_code_link,
      cover_photo,
      token,
      tools,
      techLength,
      slug,
    };
    dispatch(updateProject(data));
    toast.success("Project updated successfully ");
    navigate("/profile");
  };

  const handleToolChange = (e, index) => {
    let data = [...tools];
    data[index][e.target.name] = e.target.value;
    setTools(data);
  };

  const addFields = () => {
    let newTool = { name: "" };
    setTools([...tools, newTool]);
  };

  const removeFields = (techs) => {
    let filteredTools = tools.filter((tool) => tool.name !== techs);
    setTools([...filteredTools]);
  };

  return projectStatus === "loading" ? (
    <Spinner />
  ) : (
    <div className="pt-12 dark:bg-gray-800 h-screen">
      <div className="max-w-6xl p-8 shadow-inner mx-auto my-12 border-2 rounded-lg bg-white dark:bg-slate-700">
        <Link to={"/profile"} className="block">
          <span className="">
            <AiOutlineArrowLeft className="text-6xl bg-green-200 p-4 rounded-full hover:shadow-md dark:bg-gray-800 dark:text-slate-200" />
          </span>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="my-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-2">
            <div className="lg:col-end-4 lg:col-span-3 mx-10">
              <h2 className="my-4 text-xl font-bold">Project</h2>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your project title"
                  required
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="desc"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400"
                >
                  Description
                </label>
                <textarea
                  id="desc"
                  rows="6"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="description..."
                ></textarea>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="live_preview_link"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Live Preview Link
                </label>
                <input
                  type="text"
                  name="live_preview_link"
                  value={live_preview_link}
                  onChange={(e) => setLive_preview_link(e.target.value)}
                  id="live_preview_link"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Live link"
                  required
                />
              </div>
              <div className="mt-5">
                <label
                  htmlFor="source_code_link"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                >
                  Source Code
                </label>
                <input
                  type="text"
                  name="source_code_link"
                  value={source_code_link}
                  onChange={(e) => setSource_code_link(e.target.value)}
                  id="source_code_link"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Source Code"
                  required
                />
              </div>
              <div className="mt-5">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  onChange={handleUploadImage}
                  className="block w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  required
                />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="my-4 text-xl font-bold">Techs & Tools</h2>
              <p className="text-sm text-gray-400">
                Which technologies, tools, and languages you employed to build
                this project?
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {tools?.length > 0 ? (
                  tools.map((tool, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <input
                        type="text"
                        name="name"
                        value={tool.name}
                        onChange={(e) => handleToolChange(e, index)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFields(tool.name)}
                        className="ml-3 border rounded-lg py-3 px-5"
                      >
                        <ImCancelCircle className="text-2xl text-red-500" />
                      </button>
                      <button
                        onClick={addFields}
                        type="button"
                        className="ml-3 border rounded-lg py-3 px-5"
                      >
                        <AiOutlinePlusCircle className="text-2xl text-blue-500" />
                      </button>
                    </div>
                  ))
                ) : (
                  <button
                    type="button"
                    onClick={addFields}
                    className="flex items-center text-green-500 "
                  >
                    <BsPlusLg className="mr-2" />
                    <span>Add Tool</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <button className="ml-10 px-8 py-3 rounded-lg text-lg border hover:shadow-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
