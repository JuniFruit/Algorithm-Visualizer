import { randomize } from "../utilities/utility.js";
import { waitForMs } from "../utilities/utility.js";

export const recursiveMazeUntraversable = async (start) => {
    const stack = [start];
    const visited = [start];

    while (stack.length) {
        let current = stack.pop();
        await waitForMs(10);
        current.val.id = 'unvisited'
        let neighbor = returnRandomNeighbor(current.edges, visited);
        if (neighbor) {
            stack.push(current)

            removeBorder(current, neighbor);
            visited.push(neighbor);
            stack.push(neighbor);
        }
    }
}


const returnRandomNeighbor = (edges, visited) => {

    const unvisited = []
    for (let i = 0; i < edges.length; i++) {
        if (!visited.includes(edges[i].end)) unvisited.push(edges[i].end)
    }
    let neighbor = null;
    if (unvisited.length) neighbor = unvisited[randomize(unvisited.length)];


    return neighbor;
}



const removeBorder = (currentVertex, nextVertex) => {
    const border = `1px solid white`;
    currentVertex.val.id = "unvisited";
    nextVertex.val.id = 'current';
    if (currentVertex.y - nextVertex.y === -1) {
        currentVertex.val.style.borderRight = border;
        nextVertex.val.style.borderLeft = border;
    }
    if (currentVertex.y - nextVertex.y === 1) {
        currentVertex.val.style.borderLeft = border;
        nextVertex.val.style.borderRight = border;
    }
    if (currentVertex.x - nextVertex.x === -1) {
        currentVertex.val.style.borderBottom = border;
        nextVertex.val.style.borderTop = border;
    }
    if (currentVertex.x - nextVertex.x === 1) {
        currentVertex.val.style.borderTop = border;
        nextVertex.val.style.borderBottom = border;
    }
}