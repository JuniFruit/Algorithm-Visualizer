import { clearPrevSearch, 
    clearTable, 
    handleError, 
    setWall, 
    waitForMs, 
    disableAllButtons, 
    enableAllButtons } from "../utilities/utility.js";
import { createTable } from "../table/table.js";
import { Graph } from "../graph/Graph.js";
import { depthFirst } from "../algorithms/depthFirst.js";
import { breadthFirstTraversal } from "../algorithms/breadthFirst.js";
import { aStarSearch } from "../algorithms/Astar.js";
import { recursiveMazeUntraversable } from "../mazes/recursiveMaze.js";
import { basicMaze } from "../mazes/basicMaze.js";
import { stairPattern } from "../mazes/stairPattern.js";
import { dijkstraSearch } from "../algorithms/dijkstrasAlg.js";


/* Constants */

const WIDTH = Math.floor(window.innerWidth / 25);
const HEIGHT = Math.floor(500 / 25);
let SPEED = 10;
let USER_ALGORITHM;


/* Selectors */

const tableBody = document.querySelector('.table-body');
const startBtn = document.querySelector('.startButton');
const clearBtn = document.querySelector('.clearButton');
const algorithms = document.querySelectorAll('.alg');
const speedButtons = document.querySelectorAll('.speed');
const description = document.querySelector('.description-content');
const mazeButtons = document.querySelectorAll('.maze');


/* Initial table */

createTable(WIDTH, HEIGHT);

/* Main */

const convertTableToGraph = () => {
    const tableNodes = document.querySelectorAll('.tableNode');
    const graph = new Graph(false, true);
    graph.convertTo2DGraph(tableNodes, WIDTH, HEIGHT);
    return graph;
}

const visualize = async (arr) => {
    disableAllButtons();
    await animateSearch(arr[0]);
    await animatePath(arr[1]);
    enableAllButtons();
}

const animateSearch = async (arr) => {

    for (let i = 0; i < arr.length; i++) {
        await waitForMs(SPEED)
        if (arr[i].val.id === 'wall' || arr[i].val.id === 'target' || arr[i].val.id === 'start') {
            null
        } else {
            arr[i].val.id = 'visited';

        }
    }
}

const animatePath = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
        await waitForMs(SPEED)
        if (arr[i].val.id === 'wall' || arr[i].val.id === 'target' || arr[i].val.id === 'start') {
            null
        } else {
            arr[i].val.id = 'path';

        }
    }
}


const setDescription = (algorithm) => {
    description.innerHTML = '';

    switch (algorithm) {
        case 'Depth First':
            description.append('Depth-first search starts at the root node and explores as far as possible along each branch before backtracking.')
            break;
        case 'Breadth First':
            description.append('Breadth-first search finds shortest paths from a given source vertex to all other vertices.');
            break;
        case 'A* star':
            description.append('A* star search finds the shortest path. Given the endpoint, algorithm can search for the target much faster.');
            break;
        case `Dijkstra's algorithm`:
            description.append('Dijkstra\'s Algorithm uses the weights of the edges to find the path that minimizes the total distance between the source node and all other nodes.')
            break;
        default:
            description.append('Pick an algorithm!')
    }
}

/* Handlers */

const handleStart = () => {
    clearPrevSearch();

    const graph = convertTableToGraph();
    graph.addNeighbors(1);
    const algorithm = USER_ALGORITHM;
    
    setDescription(algorithm)
    const startNode = document.querySelector('#start');
    const targetNode = document.querySelector('#target')
    if (!startNode || !targetNode) return handleError('Either start or target point is missing')

    const startX = Number(startNode.datatype.split('-')[0]);
    const startY = Number(startNode.datatype.split('-')[1]);
    const targetX = Number(targetNode.datatype.split('-')[0]);
    const targetY = Number(targetNode.datatype.split('-')[1]);


    switch (algorithm) {
        case 'Depth First':
            visualize(depthFirst(graph.vertices[startX][startY]))
            break;
        case 'Breadth First':
            visualize(breadthFirstTraversal(graph.vertices[startX][startY]))
            break;
        case 'A* star':
            visualize(aStarSearch(graph.vertices[startX][startY], graph.vertices[targetX][targetY]));
            break;
        case `Dijkstra's algorithm`:
            visualize(dijkstraSearch(graph.vertices[startX][startY], graph.vertices[targetX][targetY],graph.vertices));
            break;
    }

}

const handleAlgChoice = (e) => {

    USER_ALGORITHM = e.target.innerHTML;
    setDescription(e.target.innerHTML)
}

const handleSpeedChange = (e) => {
    const speedSpan = document.getElementById('speedChange');
   
    switch (e.target.innerHTML) {
        case 'Fast':
            SPEED = 10;
            speedSpan.innerHTML = 'Speed: Fast';
            break;
        case 'Average':
            SPEED = 30;
            speedSpan.innerHTML = 'Speed: Average';

            break;
        case 'Slow':
            SPEED = 40;
            speedSpan.innerHTML = 'Speed: Slow';

            break;
    }
}

const handleMazeGeneration = async (e) => {
    clearTable();
    const graph = convertTableToGraph();
    graph.addNeighbors(1);

    disableAllButtons();
    switch (e.target.innerHTML) {
        case 'Basic Maze':
            basicMaze(graph.vertices);
            enableAllButtons();
            break;
        case 'Stair Pattern':
            stairPattern(graph.vertices[19][4]);
            enableAllButtons();
            break;
        case 'Recursive Non Traversable':
            await recursiveMazeUntraversable(graph.vertices[0][0]);
            enableAllButtons();
            startBtn.disabled = true;
            break;

    }

}

/* Listeners */

mazeButtons.forEach(btn => btn.onclick = handleMazeGeneration);
speedButtons.forEach(btn => btn.onclick = handleSpeedChange);
algorithms.forEach(alg => alg.onclick = handleAlgChoice)
clearBtn.onclick = clearTable;
startBtn.onclick = handleStart;
tableBody.onmousemove = setWall;
