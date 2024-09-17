# Note-Finder
Produces an interactive display of a guitar-like fretboard

VERSION 2
1. Implement Node.js
2. Separate scale variable assignment data into MySQL or separate file
3. Add a "sticky-note" feature on click - hovered value will stick when clicked, unstick on click
4. Create a dynamic instrument feature - add or remove strings
5. Fix scale-highlight limitations - will break if anything changes positional placements (tuning)



EVENTUAL TO-DO'S:
1. Dynamic limit-setting: need to figure out a way to dynamically set min/max values in loop
    - considering changing the way I find scales
    - try finding values via a flat array vs. 2d [A, B, C, D,.....]

2. Dynamic fretboard generation: need to figure out a way to dynamically set strings via user input
    - standard tuning means the next string will begin on value[colIndex + 6]

3. Being able to set different tunings won't work properly until #1 and #2 are solved