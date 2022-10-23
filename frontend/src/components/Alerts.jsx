import React from "react";

const Alerts = ({ message, type }) => {
  let text_color = "";
  let bg_color = "";
  if (type === "info") {
    text_color = "blue";
    bg_color = "blue";
  }
  return (
    <div
      className={`p-4 mb-0 mx-10 text-sm text-${text_color}-700 bg-${bg_color}-100 rounded-lg dark:bg-${bg_color}-200 dark:text-${text_color}-800`}
      role="alert"
    >
      <span className="font-medium"></span> {message}
    </div>
  );
};

export default Alerts;
