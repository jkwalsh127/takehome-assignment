const test = require("tape");

// TODO: For this simplified table, the "convert" function should be passing the test as-is. However, formulas are used in cells d3, d4, and d5. These are saved in the JSON data structure in formula form, for example, "=c3*b8". We want the HTML table this function creates to show values, not formulas. It is your job to write the logic that will provide these cells with the proper output. 
// * Scan through the "convert" function to get an idea of how it works. The comments should assist your understanding. Lookout for the TODO on line 129 to know where to begin writing your logic.
// * The function would typically return the "output" variable, which will include every HTML element, but because we just want to test the cells with formulas, the function returns just the "formulaCells" array. Once you write the logic to properly format our cells that contain formulas, push them to the "formulaCells" array.

const capTable = 
{
    "name": "Cap Table",
    "freeze": "A1",
    "styles": [],
    "merges": [],
    "rows": {
      "1": {
        "cells": {
          "1": {
            "text": "founders"
          },
          "2": {
            "text": "token allocation"
          },
          "3": {
            "text": "token count"
          }
        }
      },
      "2": {
        "cells": {
          "1": {
            "text": "founder 1"
          },
          "2": {
            "text": ".40"
          },
          "3": {
            "text": "=c3*b8"
          }
        }
      },
      "3": {
        "cells": {
          "1": {
            "text": "founder 2"
          },
          "2": {
            "text": ".20"
          },
          "3": {
            "text": "=c4*b8"
          }
        }
      },
      "4": {
        "cells": {
          "1": {
            "text": "founder 3"
          },
          "2": {
            "text": ".20"
          },
          "3": {
            "text": "=c5*b8"
          }
        }
      },
      "6": {
        "cells": {
          "1": {
            "text": "token total"
          }
        }
      },
      "7": {
        "cells": {
          "1": {
            "text": "1000000"
          }
        }
      },
      "len": 100
    },
    "cols": {
      "len": 26
    },
    "validations": [],
    "autofilter": {}
}

function convert(data) {
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
  let output = formulaCells.join('');

  return output;
}

test("convert should output the formula-containing cells in a format that matches the given example", t => {
  const result = convert(capTable);

  t.deepEqual(result, '<td id="d3">400000</td><td id="d4">200000</td><td id="d5">200000</td>')
  t.end()
})