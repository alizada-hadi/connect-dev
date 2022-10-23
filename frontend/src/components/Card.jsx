import React from "react";
import Avatar from "../assets/users/avatar-2.jpg";
import { Link } from "react-router-dom";
import Badge from "./Badge";

const Card = ({ programmer }) => {
  return (
    <Link to={`/programmer/${programmer.id}`}>
      <div className="bg-white rounded-md border-2 dark:bg-slate-700 dark:border-gray-500 hover:shadow-md hover:shadow-outline">
        <div className="flex flex-col">
          <img
            src={programmer.avatar}
            className="mx-auto rounded-full w-32 h-32 my-2"
            alt=""
          />
          <h2 className="text-2xl text-center dark:text-slate-200 mb-4">
            {programmer.first_name} {programmer.last_name}
          </h2>
          <p className="px-3 text-justify indent-8 text-gray-700 dark:text-slate-200">
            {programmer.about.substring(0, 150)}...
          </p>
          <div className="grid grid-cols-3 items-center my-3 px-3 gap-2">
            {programmer?.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} item={skill.title} bgColor="#dbeafe" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
