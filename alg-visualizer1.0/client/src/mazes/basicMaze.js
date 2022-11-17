import { randomize } from "../utilities/utility.js";

export const basicMaze = (vertices) => {

    for (let i=0;i<vertices.length;i++) {
        for (let j=0;j<vertices[i].length;j++) {
            const random = randomize(10);
            if (random < 3) {
                vertices[i][j].val.id === 'start' || vertices[i][j].val.id === 'target' ? null : vertices[i][j].val.id = 'wall';
            }
        }
    }
}