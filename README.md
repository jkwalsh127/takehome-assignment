# Take-home assignment

## Synopsis 
This takehome assignment is testing your ability as a front-end developer. In this scenario, you are working with a function that converts JSON data from an imaginary spreadsheet into an HTML table. As you will see, much of this function is already written. However, the problem is that there are a few formulas used in the spreadsheet (recall that formula text in spreadsheets usually take the form "=a1*b2", for example). As the function is written, it returns `<td>` for these cells with the formulas as their content. This, of course, is not what we want. Instead, the actual values of these formulas should be displayed in the HTML table. So, it is your job to figure out how to create `<td>` that contains values rather than formulas.

## Requirements
The test "./src/tests/convert.test.js" should pass.

## Procedure
This repo is setup with the following:
- A "template" folder that contains the JSON of the imaginary table data. The .js file is just the json written in a more user-friendly way. It is also imported into App.js
- A "utils" folder that contains the "convert" function in its incomplete form. It too is imported into App.js
- A "tests" folder with the test you are being asked to pass

The test file has both the JSON data and the "convert" function present there. You should edit the function in this file. However, launch the React app to view the table the function is attempting to create. If you click the "convert" button, the console will display the entire HTMl output of "convert.js". The duplicate function you will work with in the test file is setup to only return an array of the cells with formulas. This makes for easier testing. 

## Testing
To run the test, open a terminal and navigate to "/src/tests". Run the command:
```
npx tape convert.test.js
```
