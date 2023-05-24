export function Astar(startNode, endNode) {
  let openSet = [];
  let closedSet = [];
  let path = [];
  let visitedNodes = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let leastIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[leastIndex].f) {
        leastIndex = i;
      }
    }

    let current = openSet[leastIndex];
    visitedNodes.push(current);
    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.prev) {
        path.push(temp.prev);
        temp = temp.prev;
      }
      return { path, visitedNodes, error: "No Path" };
    }

    openSet = openSet.filter((elt) => elt !== current);
    closedSet.push(current);

    let neighbours = current.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.h = heruistic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.prev = current;
        }
      }
    }
  }
  return { path, visitedNodes, error: "No Path Found" };
}

function heruistic(nodeA, nodeB) {
  //   let dx = Math.abs(nodeA.x - nodeB.x);
  //   let dy = Math.abs(nodeA.y - nodeB.y);
  //   return Math.sqrt(dx * dx + dy * dy);

  return Math.abs(nodeB.x - nodeA.x) + Math.abs(nodeB.y - nodeA.y);
}

export function getNodesInShortestPath(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.prev;
  }
  return nodesInShortestPathOrder;
}
