
export const depthFirst = (start) => {
    let stack = [];

    const visited = [start]
    stack.push(start);
    let path = []
    while (stack.length) {
        const current = stack.pop();   
        if (current.val.id === 'target') {
            path = [...visited];
            break;
        };
        if (!visited.includes(current)) visited.push(current);
        current.edges.forEach(edge => {
            const neighbor = edge.end;
            if (neighbor.val.id === 'wall') return;
            if (!visited.includes(neighbor)) {
                
                stack.push(neighbor);
            }
        })
    }
    return [visited, path]
}