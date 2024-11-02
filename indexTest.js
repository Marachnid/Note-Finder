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
    cells.forEach(cell => {
        (hoveredValue == cell.textContent ? cell.classList.add("highlight") : null);
    });
}



//loops through existing cells to add html class to any INCLUDED in hoveredScale
const highlightScaleNotes = (hoveredValue, cells) => {

    //value is assigned in findScale based on user-toggled radio buttons
    let highlightedScale = determineScale(hoveredValue);


    cells.forEach(cell => {
        (highlightedScale.includes(cell.textContent) ? cell.classList.add("highlight") : null);
    });
}



//determines the correct scale to use and returns 
const determineScale = (hoveredValue) => {

    //radio references to toggled scales
    const minorScaleQuery = document.getElementById("minorScale");
    const majorScaleQuery = document.getElementById("majorScale");

    //hovered scale that will be highlighted
    let hoveredScale = [];


    //loops through musicalNotes[] to find match with hoveredValue, then determines which scale is checked ON
    for (let i = 0; i < musicalNotes.length; i++) {

        if (musicalNotes[i] === hoveredValue) {

            //thinking of how to loop conditions/buttons when more are added
            (minorScaleQuery.checked ? hoveredScale = assignMinorScale(i) : null);
            (majorScaleQuery.checked ? hoveredScale = assignMajorScale(i) : null);

            break;
        }
    }

    //returns scale notes to be highlighted in parent function
    return hoveredScale;
}



/*
    use modulo to wrap back to the beginning of the array and avoid out of bounds indexes when adding

    if starting at "B"[i=2] and myArray.length = 12

    to find the 7th interval "A"[i=0] which is 10 positions UP from B (root) : 
        myArray(2 + 10 % 12) === remainder = 0
        this sends us back to the beginning of the array to find the 7th scale interval
*/

//minor scale
const assignMinorScale = (loopCounter) => {

    //temporary array to hold and return values
    let minorScale = [];


    minorScale.push(
        musicalNotes[(loopCounter) % musicalNotes.length],
        musicalNotes[(loopCounter + 2) % musicalNotes.length],
        musicalNotes[(loopCounter + 3) % musicalNotes.length],
        musicalNotes[(loopCounter + 5) % musicalNotes.length],
        musicalNotes[(loopCounter + 7) % musicalNotes.length],
        musicalNotes[(loopCounter + 8) % musicalNotes.length],
        musicalNotes[(loopCounter + 10) % musicalNotes.length]
    );

    return minorScale;

}