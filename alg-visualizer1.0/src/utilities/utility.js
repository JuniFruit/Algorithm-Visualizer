

export const setWall = (e) => {
    if (e.buttons === 1 && e.target.className === 'tableNode') {

        if (e.target.id === 'unvisited' || e.target.id === 'visited') return e.target.id = 'wall';

    } else if (e.buttons === 2 && e.target.className === 'tableNode') {
        if (e.target.id === 'start' || e.target.id === 'target') return;
        return e.target.id = 'unvisited'
    }

}

export const setTarget = (e) => {
    const prevTarget = document.querySelector('#target');
    prevTarget ? prevTarget.id = 'unvisited' : null;

    e.target.id = 'target'
}

export const setStart = (e) => {
    const prevStart = document.querySelector('#start');
    prevStart ? prevStart.id = 'unvisited' : null;

    e.target.id = 'start'
}

export const waitForMs = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export const clearTable = () => {
    enableAllButtons();
    const nodes = document.querySelectorAll('.tableNode');
    nodes.forEach(node => {
        if (node.id === 'start' || node.id === 'target') return;
        node.id = 'unvisited'
        node.style.border = '1px solid black';
    })
}

export const clearPrevSearch = () => {
    const nodes = document.querySelectorAll('.tableNode');

    nodes.forEach(node => {
        if (node.id === 'start' || node.id === 'target' || node.id === 'wall') return;
        node.id = 'unvisited';
    })
}

export const randomize = (max) => {
    return  Math.floor(Math.random() * max);
}

export const handleError = (msg) => {
    
    const prevMsg = document.querySelector('.description-content');
    prevMsg.innerHTML = '';

    prevMsg.append(msg);
}

export const disableAllButtons = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
}

export const enableAllButtons = () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = false);
}