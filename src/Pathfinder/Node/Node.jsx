import React from "react";

import "./Node.css";

const Node = ({ col, isFinish, isStart, isWall, row }) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
  );
};

export default Node;
