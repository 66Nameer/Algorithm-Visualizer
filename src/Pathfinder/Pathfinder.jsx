import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";

import "./Pathfinder.css";

const cols = 50;
const rows = 20;

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    visitedNodesInOrder.forEach((node, i) => {
      setTimeout(() => {
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-visited";
        }
      }, 10 * i);
    });

    setTimeout(() => {
      animateShortestPath(nodesInShortestPathOrder);
    }, 10 * visitedNodesInOrder.length);
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    nodesInShortestPathOrder.forEach((node, i) => {
      setTimeout(() => {
        const nodeElement = document.getElementById(
          `node-${node.row}-${node.col}`
        );
        if (nodeElement) {
          nodeElement.className = "node node-shortest-path";
        }
      }, 30 * i);
    });
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const getInitialGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.isStart = this.x === START_NODE_COL && this.y === START_NODE_ROW;
    this.isFinish = this.x === FINISH_NODE_COL && this.y === FINISH_NODE_ROW;
    this.g = 0;
    this.f = 0;
    this.h = 0;
    this.distance = Infinity;
    this.isVisited = false;
    this.neighbors = [];
    this.isWall = false;
    this.previousNode = null;
    this.addNeighbors = function (grid) {
      const i = this.x;
      const j = this.y;

      if (i > 0) this.neighbours.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
      if (j > 0) this.neighbours.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
    };
  }

  return (
    <>
      <button onClick={visualizeDijkstra}>Visualize Dijkstra</button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                    row={rowIdx}
                    col={nodeIdx}
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

export default Pathfinder;
