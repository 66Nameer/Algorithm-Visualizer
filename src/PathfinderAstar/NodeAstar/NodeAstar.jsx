import React from "react";

import "./NodeAstar.css";

const NodeAstar = ({ isStart, isEnd, row, col, isWall }) => {
  const classes = isEnd
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";

  return <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>;
};

export default NodeAstar;
