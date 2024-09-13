"use strict";

//initialization method - kept in for control of separate methods/tests
const init = () => {

    //output interactive table
    createNotesTable();
}


//function builds interactive notes display
//output 2d array of musical notes into row/column format
const createNotesTable = () => {

    const musicalNotes = [
        ["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"],  //B
        ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"],  //E
        ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],  //A
        ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"],  //D
        ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"]   //G
    ];
    

    //id references
    const containerQuery = document.getElementById("notesContainer");
    const tableQuery = document.getElementById("fretboard");
    const scaleSwitch = document.getElementById("scaleHighlight");

    //initialize hover value
    let hoveredValue = "";
    let hoveredScale = [];
    let singleSelect = true;


    scaleSwitch.addEventListener("change", () => {
        if (scaleSwitch.checked) {
            singleSelect = false;
        } else {
            singleSelect = true;
        }
    });
    


    //iterate first layer of array - strings
    for (let strings of musicalNotes) {
        const tableRow = document.createElement("tr"); //create a new row for every string

        //iterate second layer of array - notes
        for (let notes of strings) {
            const tableData = document.createElement("td");
            tableData.textContent = notes; //insert array data into new cells


            //Key interaction point - controls hover conditions and behavior
            tableData.addEventListener("mouseover", () => {
                const cells = document.querySelectorAll("td");
                hoveredValue = notes;
            

                //if scale highlight, determine scale values
                if (!singleSelect) {
                    hoveredScale = findScale(musicalNotes, hoveredValue, hoveredScale);
                }

                //highlight cells
                cells.forEach(cell => {
                    (hoveredValue == cell.textContent && singleSelect ? cell.classList.add("highlight") : null);
                    (hoveredScale.includes(cell.textContent) && !singleSelect ? cell.classList.add("highlight") : null);
                });
            });

            //remove conditions on mouseout
            tableData.addEventListener("mouseout", () => {
                const cells = document.querySelectorAll("td");
                hoveredValue = ""; //reset
                cells.forEach(cell => {cell.classList.remove("highlight");});
            });

            //append td
            tableRow.appendChild(tableData);
        }

        //append rows
        tableQuery.append(tableRow);
    }
}


//used to define search area for scales that avoids out of bounds indexes
//find first occurence of hoveredValue and set index position = first occurence index
const findScale = (musicalNotes, hoveredValue, hoveredScale) => {

    //this has to be manual for now - dynamic limiters/initializers are way overkill for predetermined scales
    const rowLimit = 2;         // ++ controls search zone verticality from [0]
    const colInitializer = 1;   // ++ pushes search zone left side -> right
    const colLimit = 8;         // -- limits search zone right side -> left


    for (let rowIndex = 0; rowIndex < rowLimit; rowIndex++) {
        for (let colIndex = colInitializer; colIndex < colLimit; colIndex++) {
            if (musicalNotes[rowIndex][colIndex] === hoveredValue) {
                console.log(`First occurrence of ${hoveredValue} found at Row: ${rowIndex}, Column: ${colIndex}`);



                //need some kind of logic here to set which scales to use
                // hoveredScale = minorScale(musicalNotes, rowIndex, colIndex);
                hoveredScale = majorScale(musicalNotes, rowIndex, colIndex);
                console.log(hoveredScale);
                return hoveredScale;
            }
        }
    }
}



//convert into separate file later on - would need to implement Node.js to separate
//considering MySQL - would need to save equations, not values
const minorScale = (musicalNotes, rowIndex, colIndex) => {

    const minorScale = [
        musicalNotes[rowIndex][colIndex],
        musicalNotes[rowIndex][colIndex + 2],
        musicalNotes[rowIndex][colIndex + 3],
        musicalNotes[rowIndex + 1][colIndex],
        musicalNotes[rowIndex + 1][colIndex + 2],
        musicalNotes[rowIndex + 1][colIndex + 3],
        musicalNotes[rowIndex + 2][colIndex]
    ];

    return minorScale;
}

const majorScale = (musicalNotes, rowIndex, colIndex) => {

    const majorScale = [
        musicalNotes[rowIndex][colIndex],
        musicalNotes[rowIndex][colIndex + 2],
        musicalNotes[rowIndex + 1][colIndex - 1],
        musicalNotes[rowIndex + 1][colIndex],
        musicalNotes[rowIndex + 1][colIndex + 2],
        musicalNotes[rowIndex + 2][colIndex - 1],
        musicalNotes[rowIndex + 2][colIndex + 1]
    ];

    return majorScale;
}