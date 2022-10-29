export default function convert(data) {
  // If you look at the data object, you will see that the "rows" key has an object for a value. That object contains the index of each populated row as a key. If we want to create a layout, we must include rows that are not popualted. Observe how the following logic accomplishes that. 
  let rows = data.rows;
  let allRowIndexes = Object.keys(rows); //returns an array of the given object's key names (populated row indexes, in this case)
  for (let i = 0; i < allRowIndexes.length; i++) {
    let loop = i.toString(); 
    if (allRowIndexes[i] === "len") {
      i ++
    } else if (allRowIndexes[i] !== loop) {
      allRowIndexes.splice(i, 0, loop) //array.splice(start, deleteCount, newValue)
    }
  } 
  // To complete the layout, we have to determine the furtherst right column used. Our row objects have cell objects that contain the column number as keys. Observe how the following logic scans each row and adds the column values to the "columns" array. The highest value is then extracted.
  let columns = [];
  Object.values(rows).forEach((row) => {
    Object.values(row).forEach((cells) => {
      Object.keys(cells).forEach((column) => {
        columns.push(column);
      })
    })
  })
  let furthestColumn = Math.max(...columns);
  let furthestColumnNum = furthestColumn + 1;  

  let HTML = [];
  let formulaCells = [];   // * push your modified cells into this array for ease of testing
  HTML.push("<table>\n<tbody>\n")
  for (let i = 0; i < allRowIndexes.length; i++) {
    let rowID = i + 1; // sets the row to be used to identify each cell (example: cell d4 has row 4)
    HTML.push(`<tr id="row${i}">`);
    // select for rows that are defined (contain at least one cell with content)
    if (i in rows) {
      let populatedColumnNumber = Object.keys(rows[i].cells); // the column numbers of each populated cell in each row
      for (let j = 0; j < furthestColumnNum; j++) {   
        let code = 'a'.charCodeAt(0); // returns 97, the character code of 'a'
        let columnID = String.fromCharCode(code + j);// sets the column to be used to identify each cell (ecample: cell d4 has column d);
        let loop = j.toString();
        let columnIndex = populatedColumnNumber.indexOf(loop); // returns the first index at which a given element can be found
        if (columnIndex > -1) { // returns true if there is a populated cell in the column matching the index of the loop
          HTML.push(`<td id="${columnID}${rowID}">${rows[i].cells[j].text}</td>`);
          // TODO consider writing your logic to identify the "text" that is in formula form (hint, formulas always start with "="!!)
        // If the column is not populated, add a blank td element
        } else {
            HTML.push("<td></td>");
        }
      }
    // If there aren't any populated cells in the row, add blank td elements for each column
    } else {
      for (let j = 0; j < (furthestColumn + 1); j++) {
        HTML.push("<td></td>");
      }
    }
    // Before starting the next row loop:
    HTML.push('</tr>\n');
  }
  // Once the row loop is exited:
  HTML.push("</tbody>\n</table>");
  let output = HTML.join('');
  console.log(output);
}