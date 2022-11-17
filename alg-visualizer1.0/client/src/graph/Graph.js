
export class Edge {
    constructor(start = null, end=null, weight=null) {
        this.start = start;
        this.end = end;
        this.weight = weight
    }
}

export class Vertex {
    constructor(val,x,y) {
        this.val = val;
        this.edges = [];
        this.x = x;
        this.y = y;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.parent = null;
    }
    addEdge(vertex, weight=null) {
        this.edges.push(new Edge(this, vertex, weight));
    }
    removeEdge(vertex) {
        this.edges = this.edges.filter(edge => edge.end.val !== vertex.val);
    }    
    addNeighbors(arr, weight) {
        const vertical = this.x;
        const horizontal = this.y;      
        if (horizontal > 0) this.edges.push(new Edge(this, arr[vertical][horizontal - 1], weight));
        if (horizontal < arr[vertical].length -1) this.edges.push(new Edge(this, arr[vertical][horizontal + 1], weight));
        if (vertical > 0) this.edges.push(new Edge(this, arr[vertical - 1][horizontal], weight));
        if (vertical < arr.length-1) this.edges.push(new Edge(this, arr[vertical + 1][horizontal], weight));
    }

}

export class Graph {
    constructor(isDirected=false, isWeighted=false) {
        this.isDirected = isDirected;
        this.isWeighted = isWeighted;
        this.vertices = [];
    }

    addVertex(val) {      
          
        const newVertex = new Vertex(val);
        this.vertices.push(newVertex);
        return newVertex;
        
    }

    addEdge(vertexOne, vertexTwo, weight) {

        vertexOne.addEdge(vertexTwo, weight);
        if (!this.isDirected) return vertexTwo.addEdge(vertexOne, weight)
        return;
    }

    removeEdge(vertexOne, vertexTwo) {
        vertexOne.removeEdge(vertexTwo);
        if (!this.isDirected) return vertexTwo.removeEdge(vertexOne)
        return;

    }

    addNeighbors(distance) {
        const weight = this.isWeighted ? distance:  null
        for (let i=0;i<this.vertices.length; i++) {
            for(let j=0;j<this.vertices[i].length; j++) {
                this.vertices[i][j].addNeighbors(this.vertices, weight)
            }
        }
    }
    convertTo2DGraph(arr, width, height) {
    
        const arrToConvert = [...arr];
        const twoDimensionalArr = [];

        for (let i=0; i<height; i++) {
            const line = [];
            for (let j=0; j<width; j++) {
                line.push(new Vertex(arrToConvert[j], i,j));               
            }
            arrToConvert.splice(0, width);
            twoDimensionalArr.push(line);
        }
        this.vertices = twoDimensionalArr;
    }
   
   
}

