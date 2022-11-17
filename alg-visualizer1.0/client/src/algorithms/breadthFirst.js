
export const breadthFirstTraversal = (start) => {
    const visitedVertices = [start];
    const visitQueue = [];
    visitQueue.push(start);
    const predecessors = [];
    predecessors[start.val.datatype] = null;
    let path = [];
    while (visitQueue.length) {
        const current = visitQueue.shift();       
        if (current.val.id === 'target') {
            path = buildPath(start, predecessors);
            break;
        };
        current.edges.forEach(edge => {
            const neighbor = edge.end;
            if (neighbor.val.id === 'wall') return;
            if (!visitedVertices.includes(neighbor)) {
                visitedVertices.push(neighbor);
                predecessors[neighbor.val.datatype] = current;
                visitQueue.push(neighbor);
            }
            
        })
    }
    
    return [visitedVertices, path];
};

const buildPath = (start, backTrace) => {
    const goal = document.querySelector('#target').datatype;
    const stack = [];
    stack.push();

    let u = backTrace[goal];

    while (u !== start) {
        stack.push(u);
        if (typeof u === 'string') {
            u = backTrace[u]
        } else {
            u = backTrace[u.val.datatype];
        }
    }

    return stack.reverse();

}