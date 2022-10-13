// Patter designed to go from left to right

export const stairPattern = (start) => {
    try {
        const isTop = findDiagonalUpNeighbor(start);
        const isBottom = findDiagonalBottomNeighbor(start)
    
        if (isTop) return stairPattern(goDiagonalUp(start));
        if (isBottom ) return stairPattern(goDiagonalBottom(start));
    
        return;

    } catch (e) {
        
    }
}

const goDiagonalUp = (start) => {
    let current = start
    let neighborUp = findDiagonalUpNeighbor(current);    
    
    while (neighborUp) {
        if (neighborUp.val.id !== 'start' || neighborUp.val.id !== 'target') neighborUp.val.id = 'wall';

        current = neighborUp;       
        neighborUp = findDiagonalUpNeighbor(current);     
    }
    return current
}

const goDiagonalBottom = (start) => {
    let current = start
    let neighborBottom = findDiagonalBottomNeighbor(current);    

    while (neighborBottom) {
        if (neighborBottom.val.id !== 'start' || neighborBottom.val.id !== 'target') neighborBottom.val.id = 'wall';
        current = neighborBottom;       
        neighborBottom = findDiagonalBottomNeighbor(current);
    
    }
    return current
}

const findDiagonalUpNeighbor = (current) => {

    const currentTopNeighbor = current.edges.find(node => node.end.x < current.x);
    if (!currentTopNeighbor) return null;
    const currentDiagonalTopNeighbor = currentTopNeighbor.end.edges.find(node => node.end.y > currentTopNeighbor.end.y);
    return currentDiagonalTopNeighbor.end;
}

const findDiagonalBottomNeighbor = (current) => {
    const currentBottomNeighbor = current.edges.find(node => node.end.x > current.x);
    if (!currentBottomNeighbor) return null;
    const currentDiagonalBottomNeighbor = currentBottomNeighbor.end.edges.find(node => node.end.y > currentBottomNeighbor.end.y)
    return currentDiagonalBottomNeighbor.end;
}