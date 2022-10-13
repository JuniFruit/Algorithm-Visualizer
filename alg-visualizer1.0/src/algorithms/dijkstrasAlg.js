

export const dijkstraSearch = (start, target, vertices) => {
    const distances = {};
    const minHeap = [[start, 0]];

    for (let i=0; i<vertices.length;i++) {
        for(let j=0;j<vertices[i].length; j++) {
            if (vertices[i][j] !== start) distances[vertices[i][j].val.datatype] = Infinity;
        }
    }
    distances[start.val.datatype] = 0;
    const visited = [];

    while (minHeap.length) {
   
        const [node, distance] = minHeap.shift();
        visited.push(node);
        if (node === target) {
            const path = [];
            let current = node.parent;
            while (current) {
                path.push(current)
                current = current.parent
            }
            return [visited, path.reverse()];
          
        }
        node.edges.forEach(edge => {
            const neighbor = edge.end;
            const weight = edge.weight;
            if (neighbor.val.id === 'wall') return;
            let alt = distances[node.val.datatype] + weight;
      
            if (alt < distances[neighbor.val.datatype]) {
                distances[neighbor.val.datatype] = alt;
                neighbor.parent = node;
                minHeap.push([neighbor, distances[neighbor.val.datatype]]);
            }
            
        })
        minHeap.sort((a,b) => a[1] - b[1]);
    } 
    return [visited, []]
}   