import React from "react";

const TimeStamp = ({ timestamp }) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString().slice(0, 5);
};

export default TimeStamp;
