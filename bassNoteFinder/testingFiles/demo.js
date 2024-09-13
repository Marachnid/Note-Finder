"use strict";

const bassNotes = [
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],  //B
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],  //E
    ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],  //A
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],  //D
    ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"]   //G
];

//initialize hover value
let hoveredValue = null;



let singleSelect = true;

//initialization - triggers html table/data generation and event listeners
const init = () => {

    outputTable(bassNotes);     //outputs interactive fretboard
    // positionLogger();           //tracks exact index positions when mouseover
    findFirstOccurrence();      //tracks first index position occurence of hovered notes
}


//function builds interactive notes display
//output 2d array with event listeners on each td cell
const outputTable = bassNotes => {

    /*
        html boilerplate created via js - can be dropped in anywhere on the page
        attributes have to be declared separately from createElement otherwise typeUndefined when appending
    */
    const notesContainer = document.createElement("div"); //main div container
    const notesTable = document.createElement("table"); //main table/interaction display
    notesContainer.setAttribute("id", "notesContainer");
    notesTable.setAttribute("id", "fretboard");

    //id references
    const containerQuery = document.getElementById("notesContainer");
    const tableQuery = document.getElementById("fretboard");


    //iterate first layer of array - strings
    for (let strings of bassNotes) {
        const tableRow = document.createElement("tr"); //create a new row for every string

        //iterate second layer of array - notes
        for (let notes of strings) {
            const tableData = document.createElement("td");
            tableData.textContent = notes; //insert array data into new cells

            //Key interaction point - controls hover interaction and logic features
            tableData.addEventListener("mouseover", () => {
                const cells = document.querySelectorAll("td");
                hoveredValue = notes;

                let hoveredScale = ["B", "C#", "D", ];
                singleSelect = false;

                //kept separate from cells.forEach to reduce unnecessary looping after true
                for (let cell of cells) {
                    if (hoveredValue == cell.textContent) {
                        findFirstOccurrence();
                        break;
                    }
                }

                // for (let cell of cells) {
                //     (hoveredValue == cell.textContent && singleSelect ? cell.classList.add("highlight") : null);
                //     (hoveredScale.includes(hoveredValue) && !singleSelect ? cell.classList.add("highlight") : null);
                // }

                //highlight
                cells.forEach(cell => {
                    (hoveredValue == cell.textContent && singleSelect ? cell.classList.add("highlight") : null);
                    (hoveredScale.includes(cell.textContent) && !singleSelect ? cell.classList.add("highlight") : null);

                });
            });

            //remove conditions on mouseout
            tableData.addEventListener("mouseout", () => {
                const cells = document.querySelectorAll("td");
                hoveredValue = null; //reset
                cells.forEach(cell => {cell.classList.remove("highlight");});
            });

            //append table data (notes)
            tableRow.appendChild(tableData);
        }

        //append completed rows to table
        notesTable.appendChild(tableRow);
    }

    //append completed table/div containers
    notesContainer.appendChild(notesTable);
    document.body.appendChild(notesContainer);
}




//function to find the first occurrence of hoveredValue within constraints
const findFirstOccurrence = () => {

    /*
        arbitrary limits - it prevents out of bounds index's for scale multi-highlight
        all 12 musical notes should be findable within the first 5 columns of the first 3 strings
    */
    const rowLimit = 3;
    const colLimit = 6;

    for (let rowIndex = 0; rowIndex < rowLimit; rowIndex++) {
        for (let colIndex = 0; colIndex < colLimit; colIndex++) {
            if (bassNotes[rowIndex][colIndex] == hoveredValue) {
                console.log(`First occurrence of ${hoveredValue} found at Row: ${rowIndex}, Column: ${colIndex}`);


                minorScale(rowIndex, colIndex);
                // return {rowIndex, colIndex};

            }
        }
    }
}
























const minorScale = (rowIndex, colIndex) => {

    console.log(`Test: ${rowIndex}, ${colIndex}`);

}










//tracks and logs hoveredValue index positions
//won't log first hoveredValue indexes if added directly into cells on loop
const positionLogger = () => {

    document.addEventListener('DOMContentLoaded', (event) => {
        const table = document.getElementById('fretboard');
        const rows = table.getElementsByTagName('tr');
    
        //loop through first array layer
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const cells = rows[rowIndex].getElementsByTagName('td');

            //loop through second array layer
            for (let colIndex = 0; colIndex < cells.length; colIndex++) {
                cells[colIndex].addEventListener('mouseover', () => {
                    console.log(`POSITION LOGGER - Row: ${rowIndex}, Column: ${colIndex}`);

                    console.log(bassNotes[rowIndex][colIndex]);

                });
            }
        }
    });
}









//FOR LATER Array.Prototype.CopyWithin() could be helpful for creating a loop through notes array
//dynamic string generation from one array into a 2d array to allow easy fretboard string customization/tunings
const extractor = (rowIndex, colIndex) => {

    console.log("Extractor test, row: " + rowIndex + ", col: " + colIndex);
    console.log("Value Test: " + bassNotes[rowIndex][colIndex]);


    // //working if conditions for note assignment - seeing how I can modify it to reduce condition bulk
    // //works for single select of scales - only targets notes within index bounds
    // if (rowIndex < bassNotes.length) {
    //     if (colIndex< bassNotes[rowIndex].length) {console.log(bassNotes[rowIndex][colIndex])}}

    // if (rowIndex < bassNotes.length) {
    //     if (colIndex + 2 < bassNotes[rowIndex].length) {console.log(bassNotes[rowIndex][colIndex + 2])}}
    
    // if (rowIndex < bassNotes.length) {
    //     if (colIndex + 3 < bassNotes[rowIndex].length) {console.log(bassNotes[rowIndex][colIndex + 3])}}

    // if (rowIndex + 1 < bassNotes.length) {
    //     if (colIndex < bassNotes[rowIndex + 1].length) {console.log(bassNotes[rowIndex + 1][colIndex])}}

    // if (rowIndex + 1 < bassNotes.length) {
    //     if (colIndex + 2 < bassNotes[rowIndex + 1].length) {console.log(bassNotes[rowIndex + 1][colIndex + 2])}}

    // if (rowIndex + 1 < bassNotes.length) {
    //     if (colIndex + 3 < bassNotes[rowIndex + 1].length) {console.log(bassNotes[rowIndex + 1][colIndex + 3])}}
    
    // if (rowIndex + 2 < bassNotes.length) {
    //     if (colIndex < bassNotes[rowIndex + 1].length) {console.log(bassNotes[rowIndex + 2][colIndex])}}

    // if (rowIndex + 2 < bassNotes.length) {
    //     if (colIndex + 2 < bassNotes[rowIndex + 2].length) {console.log(bassNotes[rowIndex + 2][colIndex + 2])}}


    const minorScale = [];



    for (let strings of bassNotes) {

        for (let notes of strings) {

            if (notes === bassNotes[rowIndex][colIndex]) {
                console.log("true");
                return;
            }
            
            console.log("return test");
            return;

        }
    }






    // for (let intervals of minorScale) {

    //     console.log(intervals);

    // }



}




/*

highlight alternative
cells.forEach(cell => {
    if (hoveredValue == cell.textContent) {
        cell.classList.add("highlight");
    }
});






*/