import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchProgrammers } from "../features/programmer/programmerSlice";
import Button from "../components/Button";
import {
  updateSkill,
  resetSkill,
} from "../features/programmer/programmerSlice";

const EditSkill = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { access, user } = useSelector((state) => state.auth);
  const { status, skill, programmers } = useSelector(
    (state) => state.programmers
  );
  const programmer = programmers?.results?.find(
    (programmer) => programmer.id === user?.programmer?.id
  );
  const selectedSkill = programmer?.skills.find((skill) => skill.slug === slug);

  const [title, setTitle] = useState(selectedSkill ? selectedSkill?.title : "");
  const [description, setDescription] = useState(
    selectedSkill ? selectedSkill?.description : ""
  );
  const [level, setLevel] = useState(
    selectedSkill ? selectedSkill?.level_of_mastery : ""
  );

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = access.access;
    const data = { title, description, level, token, slug };
    dispatch(updateSkill(data));
    dispatch(resetSkill());
  };

  useEffect(() => {
    dispatch(fetchProgrammers());
    dispatch(resetSkill());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && skill) {
      toast.success("Your skill successfully updated ");
      navigate("/profile");
    }
  }, [skill]);

  return (
    <div className="pt-12 dark:bg-gray-800 h-screen">
      <div className="max-w-4xl p-8 shadow-inner mx-auto mt-12 border-2 rounded-lg bg-white dark:bg-slate-700">
        <Link to={"/profile"} className="block">
          <span className="">
            <AiOutlineArrowLeft className="text-6xl bg-green-200 p-4 rounded-full hover:shadow-md dark:bg-gray-800 dark:text-slate-200" />
          </span>
        </Link>
        <div className="my-6 mx-12">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                First name
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your skill"
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
            <div className="my-5">
              <label
                htmlFor="level"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-400"
              >
                Level
              </label>
              <select
                name="level"
                value={level}
                onChange={handleLevelChange}
                // id="level"
                className="rounded w-full border border-gray-300 text-md bg-gray-50 py-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base pl-3 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
              >
                <option value="">Select your level...</option>
                <option value="Starter">Starter</option>
                <option value="Basic">Basic</option>
                <option value="Comfortable">Comfortable</option>
                <option value="Skillfull">Skillfull</option>
                <option value="Master">Master</option>
              </select>
            </div>

            <Button label="Edit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSkill;
