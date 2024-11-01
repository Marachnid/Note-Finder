"use strict";

//global constant for now - planning on changing to a method when dynamic gen is figured out
const musicalNotes = [
    ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],  //B
    ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],  //E
    ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],  //A
    ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],  //D
    ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"]   //G
];



const init = () => {
    createNotesTable();
}


const createNotesTable = () => {

    //table creation references
    const containerQuery = document.getElementById("notesContainer");
    const tableQuery = document.getElementById("fretboard");

    //key value in determining logic, === whichever cell.value is hovered over
    let hoveredValue;


    //iterate first layer of array - strings (rows)
    for (let strings of musicalNotes) {
        const tableRow = document.createElement("tr");

        //iterate second layer of array - notes (columns/td)
        for (let notes of strings) {
            const tableData = document.createElement("td");
            tableData.textContent = notes;


            //KEY POINT - all eventListeners dependent on a hoveredValue are added here
            tableData.addEventListener("mouseover", () => {
                const cells = document.querySelectorAll("td");
                hoveredValue = notes;

                //controls single vs. scale-all vs. (scale-local *wip)
                toggleHighlightMode(cells, hoveredValue);
            });


            //remove highlight class for all td
            tableData.addEventListener("mouseout", () => {
                const cells = document.querySelectorAll("td");
                cells.forEach(cell => {cell.classList.remove("highlight"); });
            });


            //append td
            tableRow.appendChild(tableData);
        }
        //append rows
        tableQuery.append(tableRow);
    }
}



//determines highlight mode via radio button selection
const toggleHighlightMode = (cells, hoveredValue) => {

    //radio references
    const noteHighlight = document.getElementById("noteHighlight");
    const scaleHighlight = document.getElementById("scaleHighlight");

    //determine highlight mode
    (noteHighlight.checked ? highlightSingleNotes(cells, hoveredValue) : null);
    (scaleHighlight.checked ? highlightScaleNotes(cells, hoveredValue) : null);
}




//SEE toggleHighlightMode()
//finds and highlights all occurences of hoveredValue
const highlightSingleNotes = (cells, hoveredValue) => {
    
    cells.forEach(cell => {
        (hoveredValue == cell.textContent ? cell.classList.add("highlight") : null);
    });
}



//SEE toggleHighlightMode()
//highlights all existing occurences of hoveredValue musical scale notes
const highlightScaleNotes = (cells, hoveredValue) => {

    //determine scale values
    const hoveredScale = findScale(hoveredValue);

    cells.forEach(cell => {
        (hoveredScale.includes(cell.textContent) ? cell.classList.add("highlight") : null);
    });
}



//defines search area for scales to avoid undefined values - finds first occurence of hoveredValue
//hoveredValue cells on left, right, and bottom edges can have associated values located out of index bounds
const findScale = (hoveredValue) => {
    
    //this has to be manual for now - dynamic limiters/initializers are way overkill for a handful of scales
    const rowLimit = 2;         // ++ expands search zone downwards
    const colInitializer = 1;   // ++ pushes search zone left side -> right
    const colLimit = 8;         // -- limits search zone right side -> left
    
    for (let rowIndex = 0; rowIndex < rowLimit; rowIndex++) {
        for (let colIndex = colInitializer; colIndex < colLimit; colIndex++) {
            if (musicalNotes[rowIndex][colIndex] == hoveredValue) {

                //checks which radio options are checked and which musical scale to use
                let hoveredScale = toggleScale(rowIndex, colIndex);
                return hoveredScale;
            }
        }
    }
}


//SEE findScale()
//determines which scale to select via radio button selection
const toggleScale = (rowIndex, colIndex) => {

    //radio references
    const minorScaleQuery = document.getElementById("minorScale");
    const majorScaleQuery = document.getElementById("majorScale");

    let selectedScale;

    //determine musical scale
    (minorScaleQuery.checked ? selectedScale = minorScale(rowIndex, colIndex) : null);
    (majorScaleQuery.checked ? selectedScale = majorScale(rowIndex, colIndex) : null);

    return selectedScale;
}