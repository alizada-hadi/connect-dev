import React from "react";
import Badge from "./Badge";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-lg hover:shadow-md dark:bg-slate-700">
      <Link to={`/project/${project.slug}`}>
        <img
          src={project.cover_photo}
          alt=""
          className="object-fill w-full h-48 rounded-lg"
        />
      </Link>
      <div className="px-4 py-2 ">
        <Link to={`/project/${project.slug}`}>
          <h1 className="text-2xl mt-3 font-medium hover:text-blue-500 text-gray-700 font-Roboto dark:text-slate-200">
            {project?.title.substring(0, 20)}
          </h1>
        </Link>
        <div className="flex items-center justify-between">
          <p className="capitalize text-green-600 text-md">
            by {project?.programmer?.first_name}{" "}
            {project?.programmer?.last_name}
          </p>

          <div
            className="px-2.5 py-0.5 rounded-full text-sm"
            style={{
              backgroundColor:
                project?.total_vote_count > 0 ? "#86efac" : "#fca5a5",
            }}
          >
            vote {project?.total_vote_count}
          </div>
        </div>

        <p className="text-justify indent-4 text-gray-700 dark:text-slate-200 mt-2">
          {project?.description.substring(0, 70)}...
        </p>
        <div className="grid grid-cols-3 my-1">
          {project?.techs.map((tech, index) => (
            <Badge key={index} item={tech.name} bgColor="#dbeafe" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
