import React, { useState, useEffect } from "react";
import NodeAstar from "./NodeAstar/NodeAstar";
import "./PathfinderAstar.css";
import { Astar, getNodesInShortestPath } from "../Algorithms/astar";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";

const cols = 50;
const rows = 20;

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;

const PathfinderAstar = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [algorithm, setAlgorithm] = useState("astar");

  useEffect(() => {
    initGrid();
  }, []);

  // Creates grid
  const initGrid = () => {
    const grid = new Array(cols);

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    createSpot(grid);
    setGrid(grid);

    addNeighbours(grid);

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    let path = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;
    startNode.setVisitedNodes = false;
    endNode.setVisitedNodes = false;
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };

  // Creates Spot/Nodes for each cell on the grid
  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  // Add neighbours
  const addNeighbours = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbours(grid);
      }
    }
  };

  // Spot ctr
  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === START_NODE_ROW && this.y === START_NODE_COL;
    this.isEnd = this.x === END_NODE_ROW && this.y === END_NODE_COL;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.distance = Infinity;
    this.isVisited = false;

    this.neighbours = [];
    this.isWall = false;
    if (Math.random(1) < 0.1) {
      this.isWall = true;
    }
    this.prev = null;
    this.addneighbours = function (grid) {
      let i = this.x;
      let j = this.y;

      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }

  // Grid with Node/Spots added to it -> this is to create functionality within each node

  const shortestPath = (shortestPathNodes) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-shortest-path";
      }, 30 * i);
    }
  };

  const visualizeAstar = () => {
    const startNode = Grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = Grid[END_NODE_ROW][END_NODE_COL];
    const { visitedNodes } = Astar(startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPath(finishNode);
    animateAstar(visitedNodes, nodesInShortestPathOrder);
  };

  const animateAstar = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          shortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.x}-${node.y}`).className =
          "node node-visited";
      }, 20 * i);
    }
  };

  //   const resetGrid = () => {
  //     initGrid();
  //   };

  return (
    <>
      <button onClick={visualizeAstar}>Visualize</button>
      {/* <button onClick={resetGrid}>Reset</button> */}

      <div className="grid">
        {Grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((col, colIndex) => {
                const { isStart, isEnd, isWall } = col;
                return (
                  <NodeAstar
                    key={colIndex}
                    isStart={isStart}
                    isEnd={isEnd}
                    row={rowIndex}
                    col={colIndex}
                    isWall={isWall}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathfinderAstar;
