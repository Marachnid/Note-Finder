"use strict";

/* 
Table for reference

Musical notes
A   A#  B   C   C#  D   D#  E   F   F#  G   G#
1   2   3   4   5   6   7   8   9   10  11  12


B-Minor scale = B, C#, D, E, F#, G, A, (B)

Interval    position        position difference - ascending index
B ROOT      = 3             0
C# 2ND      = 5             2
D 3RD       = 6             3
E 4TH       = 8             5
F# 5TH      = 10            7
G 6TH       = 11            8
A 7TH       = 1             10


B-Major scale = B, C#, D#, E, F#, G#, A#, (B)

Interval    position        position difference - ascending index
B ROOT      = 3             0
C# 2ND      = 5             2
D# 3RD      = 7             4
E 4TH       = 8             5
F# 5TH      = 10            7
G# 6TH      = 12            9
A# 7TH      = 2             11


B-Hungarian-Minor scale = B, C#, D, F, F#, G, A#, (B)

Interval    position        position difference - ascending index
B ROOT      = 3             0
C# 2ND      = 5             2
D 3RD       = 6             3
E 4TH       = 9             6
F# 5TH      = 10            7
G 6TH       = 11            8
A# 7TH      = 2             11

*/







let loopCounter = 0;

//              0    1     2     3   4     5    6     7    8    9     10   11
let myArray = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

let minorArray = [];


let hoveredValue = "G#";
//open initial search loop
for (let item of myArray) {
    //if we find the hoveredValue
    if (item == hoveredValue) {

        //can be abstracted out later - determine scale notes
        for (let scaleNote of myArray) {

            minorArray.push(
                /*
                    use modulo to wrap back to the beginning of the array and avoid out of bounds indexes when adding

                    if starting at "B"[i=2] and myArray.length = 12

                    to find the 7th interval "A"[i=0] which is 10 positions UP from B (root) : 
                        myArray(2 + 10 % 12) === remainder = 0
                        this sends us back to the beginning of the array to find the 7th scale interval
                */
                myArray[(loopCounter) % myArray.length],
                myArray[(loopCounter + 2) % myArray.length],
                myArray[(loopCounter + 3) % myArray.length],
                myArray[(loopCounter + 5) % myArray.length],
                myArray[(loopCounter + 7) % myArray.length],
                myArray[(loopCounter + 8) % myArray.length],
                myArray[(loopCounter + 10) % myArray.length]
            );
            break;
        }  
    }
    loopCounter++;
}


console.log(minorArray);

for (let note of minorArray) {
    console.log(note);
}



const findScale = (hoveredValue, myArray) => {

    for (let item of myArray) {

        if (item == hoveredValue) {

            for (let scaleNote of myArray) {

                minorArray.push(
                    myArray[(loopCounter) % myArray.length],
                    myArray[(loopCounter + 2) % myArray.length],
                    myArray[(loopCounter + 3) % myArray.length],
                    myArray[(loopCounter + 5) % myArray.length],
                    myArray[(loopCounter + 7) % myArray.length],
                    myArray[(loopCounter + 8) % myArray.length],
                    myArray[(loopCounter + 10) % myArray.length]
                );
                break; 
            }
        }
    }

}







// console.log(fretboard);


const generateFretboard = () => {
    
    
    const numberOfStrings = 4;
    const standardTuningSpacing = 5;
    
    let startIndex = myArray.indexOf("B");
    let fretboard = [];
    
    
    for (let i = 0; i <= numberOfStrings; i++) {
    
        let tempFretboard = [];
    
        for (let i = 0; i < myArray.length; i++) {
    
            tempFretboard.push(myArray[(startIndex + i) % myArray.length]);
    
        }
    
        fretboard.push(tempFretboard);
    
        startIndex += standardTuningSpacing;
        tempFretboard = [];
    }

    console.log(fretboard);

}

generateFretboard();