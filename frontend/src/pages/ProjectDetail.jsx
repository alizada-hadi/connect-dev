import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgrammers } from "../features/programmer/programmerSlice";
import {
  fetchProjects,
  voteProject,
  addComment,
  fetchComments,
} from "../features/projects/projectsSlice";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Badge from "../components/Badge";
import { toast } from "react-toastify";
import { RiShareBoxLine } from "react-icons/ri";
import { BsGithub } from "react-icons/bs";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { projects, status, comments } = useSelector((state) => state.projects);
  const { programmers } = useSelector((state) => state.programmers);
  const { access } = useSelector((state) => state.auth);

  const project = projects.results.find((project) => project.slug === slug);

  let [vote, setVote] = useState(project ? project?.total_vote_count : 0);
  const [comment, setComment] = useState("");
  // ! check if current programmer already down voted this project
  const [downVoted, setDownVoted] = useState(false);
  // ! check if current programmer already up voted this project
  const [upVoted, setUpVoted] = useState(false);

  const vote_project = (slug, position) => {
    if (position === "up") {
      setVote(++vote);
      const token = access?.access;
      const data = { slug, token, vote: position };
      dispatch(voteProject(data));
    } else {
      setVote(--vote);
      const token = access?.access;
      const data = { slug, token, vote: position };
      dispatch(voteProject(data));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = access.access;
    const slug = project.slug;
    const data = { slug, token, comment };
    dispatch(addComment(data));
    toast.success("Your comment added successfully ");
    dispatch(fetchProgrammers());
    dispatch(fetchComments(slug));
    setComment("");
  };

  useEffect(() => {
    const slug = project?.slug;
    dispatch(fetchProgrammers());
    dispatch(fetchProjects());
    dispatch(fetchComments(slug));

    if (project?.up_vote?.includes(user?.programmer?.id)) {
      setUpVoted(true);
    } else if (project?.down_vote.includes(user?.programmer?.id)) {
      setDownVoted(true);
    } else {
      setUpVoted(false);
      setDownVoted(false);
    }
  }, [dispatch]);
  return status === "loading" ? (
    <Spinner />
  ) : (
    <div className="pt-12 dark:bg-gray-800">
      <div className="mx-12 md:mx-24 lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-4 ">
          <div className="mt-10">
            <h1 className="uppercase text-3xl font-bold font-Roboto text-gray-700 mb-4 dark:text-slate-200">
              Technologies & Tools
            </h1>
            <div className="grid grid-cols-4 my-2">
              {project?.techs.map((tech, index) => (
                <Badge key={index} item={tech?.name} bgColor="#cbd5e1" />
              ))}
            </div>

            <div className="mt-16 flex flex-col space-y-2">
              <a href={`${project?.live_preview_link}`}>
                <div className="flex items-center text-xl text-blue-400">
                  <RiShareBoxLine className="mr-2 text-2xl" />
                  <span>Live Preview</span>
                </div>
              </a>
              <a href={`${project?.source_code_link}`}>
                <div className="flex items-center text-xl text-blue-400">
                  <BsGithub className="mr-2 text-2xl" />
                  <span>Source Code</span>
                </div>
              </a>
            </div>
          </div>
          <div className="md:col-start-2 md:col-span-4">
            <div className="mt-10 ml-48">
              <div className="mb-8">
                <img
                  src={project?.cover_photo}
                  className="rounded-lg w-full h-[35rem]"
                  alt=""
                />
              </div>
              <h5 className="text-blue-400 text-xl font-Roboto font-medium dark:text-slate-200">
                {project?.programmer?.first_name}{" "}
                {project?.programmer?.last_name} The{" "}
                {project?.programmer?.speciality}
              </h5>

              <div className="flex items-center space-x-4">
                <div className="mt-10 flex flex-col items-center">
                  <button
                    onClick={() => {
                      vote_project(project?.slug, "up");
                    }}
                    className="dark:text-slate-200"
                    disabled={upVoted}
                  >
                    <BiUpArrow className="text-4xl text-gray-500" />
                  </button>
                  <div className="text-3xl font-bold text-gray-600 dark:text-slate-200">
                    {vote}
                  </div>
                  <button
                    onClick={() => {
                      vote_project(project?.slug, "down");
                    }}
                    className="dark:text-slate-200"
                    disabled={downVoted}
                  >
                    <BiDownArrow className="text-4xl text-gray-500" />
                  </button>
                </div>
                <div>
                  <h1 className="mt-10 text-4xl text-gray-700 font-semibold font-Roboto capitalize dark:text-slate-200">
                    {project?.title}
                  </h1>
                </div>
              </div>

              <h3 className="mt-7 uppercase text-2xl font-bold text-gray-700 dark:text-slate-200">
                About Project
              </h3>
              <p className="mt-4 text-justify text-lg text-gray-600 indent-4 dark:text-slate-200">
                {project?.description}
              </p>

              <hr className="my-12" />

              <h3 className="uppercase text-2xl font-bold text-gray-700 dark:text-slate-200">
                comment
              </h3>
              <form onSubmit={submitHandler} className="mt-3 mb-12">
                <div className="mr-32">
                  <textarea
                    id="message"
                    rows="6"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>
                <button className="px-8 py-3 rounded-md border bg-gray-800 hover:bg-white hover:border-gray-800 text-white hover:text-gray-800 mt-3">
                  Comment
                </button>
              </form>

              <div className="mb-32 mt-8">
                {comments.map((comment, index) => (
                  <div key={index} className="flex justify-start my-2">
                    <div className="w-20">
                      <img
                        src={comment?.programmer?.avatar}
                        className="w-16 h-16 rounded-full border-2 border-cyan-700"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <h2 className="mt-2 ml-2 text-xl font-medium dark:text-slate-200">
                          {comment?.programmer?.first_name}{" "}
                          {comment?.programmer?.last_name}
                        </h2>
                      </div>
                      <div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-slate-300">
                          {comment?.commented_at.substring(0, 10)}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg text-justify ml-2 text-gray-700 dark:text-slate-200">
                          {comment?.comment}
                        </p>
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

export default ProjectDetail;
