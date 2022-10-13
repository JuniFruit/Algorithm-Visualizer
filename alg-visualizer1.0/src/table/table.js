import { setTarget, setStart } from "../utilities/utility.js";

const START_X = 9;
const START_Y = 10;
const TARGET_X = 9;
const TARGET_Y = 50;

const tableBody = document.querySelector('.table-body');

export const createTable = (width, height) => {    
   
  
    for (let i = 0; i < height; i++) {
        const tableRow = document.createElement('tr');
        tableRow.id = `row ${i}`;
        
        
        for(let j=0; j<width; j++) {
            const tableNode = document.createElement('td');
            tableNode.className = 'tableNode';
            tableNode.datatype = `${i}-${j}`;        

            //setting the start node
            if (i === START_X && j === START_Y) {
                tableNode.id = 'start'               
                
            } else if (i === TARGET_X && j === TARGET_Y) {
                tableNode.id = 'target';                
            }
            else {
                tableNode.id = 'unvisited';
                tableNode.onclick = setTarget;
                tableNode.ondblclick = setStart;
            }
            tableRow.append(tableNode);
        } 
        tableBody.append(tableRow);
        
    }
    
}

