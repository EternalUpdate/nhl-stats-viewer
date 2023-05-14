import { addMinuteSecond } from "./time-helpers";

/**
 * Transposes a given matrix such that the columns become rows
 * and the rows become columns.
 * 
 * @param arr matrix as a 2D array of numbers
 * @returns the transposed 2D array
 */
export function transpose(arr: (number | string)[][]): (number | string)[][] {
    const transposedArray: (number | string)[][] = [];

    for (const col in arr[0]) {
        const newRow: (number | string)[] = [];
        for (const row in arr) {
            newRow.push(arr[row][col]);
        }
        transposedArray.push(newRow);
    }

    return transposedArray;
}

/**
 * Adds two player stats rows of the same length such that the output is 
 * a stats row containing the sum of each columnn.
 * 
 * A stats row is defined as being a row containing all the standard 
 * individual stats types from the NHL API in statsSingleSeason and yearByYear.
 * 
 * @param row1 first stats row
 * @param row2 second stats row
 * @returns a stats row containing the sum of each columnn
 */
export function addPlayerStatsRows(row1: (number | string)[], row2: (number | string)[]): (number | string)[] {
    if (row1.length != row2.length) {
        console.error("addPlayerStatsRows(): arrays different sizes");
        return [];
    }

    const sumRow: (number | string)[] = [];

    // add every column together
    for (let i = 0; i < row1.length; i++) {
        const stat1 = row1[i];
        const stat2 = row2[i];
        let sum;

        if (typeof stat1 === "number" && typeof stat2 === "number") {
            sum = stat1 + stat2;
        }
        
        // strings can only be times in the format "minutes:seconds" or "minutes"
        if (typeof stat1 === "string" && typeof stat2 === "string") {
            sum = addMinuteSecond(stat1, stat2);
        }

        if (sum) {
            sumRow.push(sum);
        }
    }

    return sumRow;
}