# Note-Finder
Produces an interactive display of a guitar-like fretboard


EVENTUAL TO-DO'S:
    1. Dynamic limit-setting: need to figure out a way to dynamically set min/max values in loop
        - considering changing the way I find scales
            - try finding values via a flat array vs. 2d [A, B, C, D,.....]

    2. Dynamic fretboard generation: need to figure out a way to dynamically set strings via user input
        - standard tuning means the next string will begin on value[colIndex + 6]
        
        3. Being able to set different tunings won't work properly until #1 and #2 are solved

Development Plan
1. Finish UI components: switches between scale and single highlight, and which scale to highlight if true
2. Add basic CSS styling
3. Add in basic templates for 4-string bass, 6-string guitar, and 7-string guitar
4. Add in UI for instrument toggle
5. Clean up and refactor code where necessary
6. Work on To-Do's