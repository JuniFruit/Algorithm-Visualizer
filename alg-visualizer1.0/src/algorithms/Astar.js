
export const aStarSearch = (start, endNode) => {
    const openSet = [start];
    const closedSet = [];
    
    while (openSet.length) {
        let lowestInd = 0;
        for (let i=0; i<openSet.length;i++) {
            if (openSet[i].f < openSet[lowestInd].f) {lowestInd = i};
        }
        
        let current = openSet[lowestInd];
        if (current === endNode) {
            let currentNode = current;
            let path = []
            while (currentNode.parent) {
                path.push(currentNode);
                currentNode = currentNode.parent;
            }
            return [closedSet, path.reverse()];
        }
        openSet.splice(lowestInd, 1);
        closedSet.push(current);

        current.edges.forEach(edge => {
            const neighbor = edge.end;
            if (neighbor.val.id !== 'wall' && !closedSet.includes(neighbor)) {
                const gScore = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (gScore < neighbor.g) neighbor.g = gScore;
                } else {
                    neighbor.g = gScore;
                    neighbor.parent = current;
                    openSet.push(neighbor)
                }
                neighbor.h = countHeuristics(neighbor, endNode);
                neighbor.f = neighbor.g + neighbor.h;
            } else {
                return
            }

        })

    }
    return [closedSet, openSet]
}

    const countHeuristics = (currentVertex, endVertex) => {
        let h = Math.abs(currentVertex.x - endVertex.x) + Math.abs(currentVertex.y - endVertex.y);

        return h;
    }