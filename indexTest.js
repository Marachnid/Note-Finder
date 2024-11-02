"use strict";

//musical notes - 12 in total
const musicalNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

//
const init = () => {

    generateFretboardTable();
}


/*
    generates and returns a 2d array to represent a guitar fretboard
    fretboard holds an array of guitar strings which in turn hold an array of frets that hold individual
    musical notes

    reproduces half of a guitar neck (frets 0-11)
*/
const generateFretboard = () => {

    //allow for user input later on - radio buttons maybe?
    const numberOfStrings = 4;
    const standardTuningSpacing = 5;
    
    //startIndex will equal a user input later on
    let startIndex = musicalNotes.indexOf("B");
    let fretboard = [];
    
    /*
        main loop - controls how many guitar strings will be added to the fretboard
        creates a temporary guitar string array to pass into fretboard once completed
    */
    for (let i = 0; i <= numberOfStrings; i++) {
    
        let tempFretboard = []; //temporarily store sub arrays
    
        //populate sub array up to length of musicalNotes
        for (let i = 0; i < musicalNotes.length; i++) {
            tempFretboard.push(musicalNotes[(startIndex + i) % musicalNotes.length]);
        }
    
        //push completed array/guitar string to fretboard
        fretboard.push(tempFretboard);
    

        /*
            important piece - is setup to start with the lowest string and note being first 
            standard tuning - subsequent guitar string is tuned 5 intervals(frets/notes) higher than the previous
                controlled by const standardTuningSpacing

            tempFretboard is emptied after each array is fully processed to allow for the next array
        */
        startIndex += standardTuningSpacing;
        tempFretboard = [];
    }

    //send to wherever the function is called
    return fretboard;
}



//generates html table displaying generated fretboard
const generateFretboardTable = () => {
    
    //table reference - adds into a blank, prexisting table for now
    const tableQuery = document.getElementById("fretboard");

    //grabs the generated fretboard to populate table
    const fretboard = generateFretboard();
    

    /*
        iterate first layer of array - strings (rows/tr)
        creates table row structure for frets to live in
    */
    for (let guitarStrings of fretboard) {
        const tableRow = document.createElement("tr");


        /*
            iterate second layer of array - frets (columns/td)
            creates frets for notes to live in
        */
        for (let notes of guitarStrings) {
            const tableData = document.createElement("td");
            tableData.textContent = notes;                  //sets/'writes' notes into td cells


            /*
                KEY point here - controls how most of the program behaves depending on what's selected
            */
            createEventListeners(tableData, notes, fretboard);

            //append td
            tableRow.appendChild(tableData);
        }
        //append rows
        tableQuery.append(tableRow);
    }
}


const createEventListeners = (tableData, notes) => {

    //sets hovered value and controls highlight mode
    tableData.addEventListener("mouseover", () => {

        //KEY value - wherever the mouse is hovering = current value for logic
        let hoveredValue = notes;    

        //highlights cells based on user selected buttons
        toggleHighlightMode(hoveredValue);
    });


    //remove highlight class for all td
    tableData.addEventListener("mouseout", () => {
        const cells = document.querySelectorAll("td");
        cells.forEach(cell => {cell.classList.remove("highlight"); });
    });


}


//determines whether to highlight single notes or scales via user toggled-radio buttons
const toggleHighlightMode = (hoveredValue) => {

    //html references
    const cells = document.querySelectorAll("td");
    const noteHighlight = document.getElementById("noteHighlight");
    const scaleHighlight = document.getElementById("scaleHighlight");

    //determine highlight mode
    (noteHighlight.checked ? highlightSingleNotes(hoveredValue, cells) : null);
    (scaleHighlight.checked ? highlightScaleNotes(hoveredValue, cells) : null);
}




//loops through existing cells to add html class to any td matching the hovered SINGLE value
const highlightSingleNotes = (hoveredValue, cells) => {

    console.log(hoveredValue);
    cells.forEach(cell => {
        (hoveredValue == cell.textContent ? cell.classList.add("highlight") : null);
    });
}



//loops through existing cells to add html class to any INCLUDED in hoveredScale
const highlightScaleNotes = (hoveredValue, cells) => {

    //determine scale values via user toggled-radio buttons
    let highlightedScale = findScale(hoveredValue);

    // console.log("highlightScaleNotes run test");
    // console.log(highlightedScale);

    cells.forEach(cell => {
        (highlightedScale.includes(cell.textContent) ? cell.classList.add("highlight") : null);
    });
}


const findScale = (hoveredValue) => {

    let hoveredScale = [];
    let loopCounter = 0;

    console.log(hoveredValue);



    for (let item of musicalNotes) {

        if (item === hoveredValue) {

            hoveredScale.push(
                musicalNotes[(loopCounter) % musicalNotes.length],
                musicalNotes[(loopCounter + 2) % musicalNotes.length],
                musicalNotes[(loopCounter + 3) % musicalNotes.length],
                musicalNotes[(loopCounter + 5) % musicalNotes.length],
                musicalNotes[(loopCounter + 7) % musicalNotes.length],
                musicalNotes[(loopCounter + 8) % musicalNotes.length],
                musicalNotes[(loopCounter + 10) % musicalNotes.length]
            );

            break;
        }
        loopCounter++;
    }
    
    return hoveredScale;
}




// //SEE findScale()
// //determines which scale to select via radio button selection
// const toggleScale = (rowIndex, colIndex) => {

//     //radio references
//     const minorScaleQuery = document.getElementById("minorScale");
//     const majorScaleQuery = document.getElementById("majorScale");

//     let selectedScale;

//     //determine musical scale
//     (minorScaleQuery.checked ? selectedScale = minorScale(rowIndex, colIndex) : null);
//     (majorScaleQuery.checked ? selectedScale = majorScale(rowIndex, colIndex) : null);

//     return selectedScale;
// }



// //defines search area for scales to avoid undefined values - finds first occurence of hoveredValue
// //hoveredValue cells on left, right, and bottom edges can have associated values located out of index bounds
// const findScale = (hoveredValue) => {
    
//     //this has to be manual for now - dynamic limiters/initializers are way overkill for a handful of scales
//     const rowLimit = 2;         // ++ expands search zone downwards
//     const colInitializer = 1;   // ++ pushes search zone left side -> right
//     const colLimit = 8;         // -- limits search zone right side -> left
    
//     for (let rowIndex = 0; rowIndex < rowLimit; rowIndex++) {
//         for (let colIndex = colInitializer; colIndex < colLimit; colIndex++) {
//             if (musicalNotes[rowIndex][colIndex] == hoveredValue) {

//                 //checks which radio options are checked and which musical scale to use
//                 let hoveredScale = toggleScale(rowIndex, colIndex);
//                 return hoveredScale;
//             }
//         }
//     }
// }

