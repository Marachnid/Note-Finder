"use strict";

//global constant - used flexibly throughout the functions
const musicalNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];


//run on browser initialization
const init = () => {

    generateDisplay(generateFretboard());
}



//generates html table displaying generated fretboard
const generateDisplay = fretboard => {
    
    //table reference - adds into a blank, prexisting table for now
    const tableQuery = document.getElementById("fretboard");

    //iterate first layer of array - strings (rows/tr) - creates table row structure for frets to live in
    for (let guitarStrings of fretboard) {
        const tableRow = document.createElement("tr");


        //iterate second layer of array - frets (columns/td) - creates frets for notes to live in
        for (let notes of guitarStrings) {
            const tableData = document.createElement("td");
            tableData.textContent = notes;                  //sets/'writes' notes into td cells


            //create event listeners attached to td elements
            createTableDataEventListeners(tableData, notes);

            //append td to row
            tableRow.appendChild(tableData);
        }

        //append rows to table
        tableQuery.append(tableRow);
    }
}



//generates a table representing half of a guitar neck (frets 0-11) - produces a 2d array fretboard[strings[frets]]
const generateFretboard = () => {

    /*
        have to use predefined constants for now - need to workout how to pass init and on-change values
        from radio selections and starting note/tuning
    */
    const numberOfStrings = 5;
    const standardTuningSpacing = 5;
    
    let startIndex = musicalNotes.indexOf("B");
    let fretboard = [];
    

    //main loop - controls how many subarrays are added - uses temp array to push completed string arrays
    for (let i = 1; i <= numberOfStrings; i++) {
    
        let tempFretboard = [];
    
        //sub loop - populate sub array up to length of musicalNotes
        for (let i = 0; i < musicalNotes.length; i++) {
            tempFretboard.push(musicalNotes[(startIndex + i) % musicalNotes.length]);
        }
    
        fretboard.push(tempFretboard);
    

        //standardTuningSpacing is arbitrary - generates strings from lowest string/note to highest
        startIndex += standardTuningSpacing;
        tempFretboard = [];
    }

    //return completed array
    return fretboard;
}



//creates/adds event listeners specific to td cells
const createTableDataEventListeners = (tableData, notes) => {

    //sets hovered value and controls highlight mode
    tableData.addEventListener("mouseover", () => {

        //KEY value - wherever the mouse is hovering = current value for highlight logic
        let hoveredValue = notes;    

        //highlights td cells based on highlighting options
        toggleHighlightMode(hoveredValue);
    });


    //remove highlight class for all td
    tableData.addEventListener("mouseout", () => {
        const cells = document.querySelectorAll("td");
        cells.forEach(cell => {cell.classList.remove("highlight"); });
    });
}



//determines whether to highlight single notes or scales via user toggled-radio buttons
const toggleHighlightMode = hoveredValue => {

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
    const hungarianScaleQuery = document.getElementById("hungarianMinorScale");

    //hovered scale that will be highlighted
    let hoveredScale = [];


    //loops through musicalNotes[] to find match with hoveredValue, then determines which scale is checked ON
    for (let index = 0; index < musicalNotes.length; index++) {

        if (musicalNotes[index] === hoveredValue) {

            //thinking of how to loop conditions/buttons when more are added
            (minorScaleQuery.checked ? hoveredScale = assignMinorScale(index) : null);
            (majorScaleQuery.checked ? hoveredScale = assignMajorScale(index) : null);
            (hungarianScaleQuery.checked ? hoveredScale = assignHungarianMinorScale(index) : null);

            break;
        }
    }

    //returns scale notes to be highlighted in parent function
    return hoveredScale;
}




/*
    modulo/remainder is used to wrap back to beginning of array in event of out of bounds indexes 
    ((index 3 + interval 10) for length of 12 === bad)
*/

//minor scale
const assignMinorScale = index => {

    //temporary array to hold and return values
    let scale = [];

    scale.push(
        musicalNotes[(index) % musicalNotes.length],
        musicalNotes[(index + 2) % musicalNotes.length],
        musicalNotes[(index + 3) % musicalNotes.length],
        musicalNotes[(index + 5) % musicalNotes.length],
        musicalNotes[(index + 7) % musicalNotes.length],
        musicalNotes[(index + 8) % musicalNotes.length],
        musicalNotes[(index + 10) % musicalNotes.length]
    );

    return scale;
}


//major scale
const assignMajorScale = index => {

    //temporary array to hold and return values
    let scale = [];

    scale.push(
        musicalNotes[(index) % musicalNotes.length],
        musicalNotes[(index + 2) % musicalNotes.length],
        musicalNotes[(index + 4) % musicalNotes.length],
        musicalNotes[(index + 5) % musicalNotes.length],
        musicalNotes[(index + 7) % musicalNotes.length],
        musicalNotes[(index + 9) % musicalNotes.length],
        musicalNotes[(index + 11) % musicalNotes.length]
    );
    
    return scale;
}



//hungarian minor scale
const assignHungarianMinorScale = index => {

    //temporary array to hold and return values
    let scale = [];

    scale.push(
        musicalNotes[(index) % musicalNotes.length],
        musicalNotes[(index + 2) % musicalNotes.length],
        musicalNotes[(index + 3) % musicalNotes.length],
        musicalNotes[(index + 6) % musicalNotes.length],
        musicalNotes[(index + 7) % musicalNotes.length],
        musicalNotes[(index + 8) % musicalNotes.length],
        musicalNotes[(index + 11) % musicalNotes.length]
    );
    
    return scale;
}