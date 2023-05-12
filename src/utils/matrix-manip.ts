/**
 * Transposes a given matrix such that the columns become rows
 * and the rows become columns.
 * 
 * @param numsArray matrix as a 2D array of numbers
 * @returns the transposed 2D array
 */
export function transpose(numsArray: number[][]): number[][] {
    const transposedArray: number[][] = [];

    for (const col in numsArray[0]) {
        const newRow: number[] = [];
        for (const row in numsArray) {
            newRow.push(numsArray[row][col]);
        }
        transposedArray.push(newRow);
    }

    return transposedArray;
}