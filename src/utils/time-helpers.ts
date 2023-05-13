/**
 * Takes a string in the format "minutes:seconds" or "minutes" and 
 * returns a number representing the total seconds represented by the string (including the minutes).
 * 
 * @param timeString string in the format "minutes:seconds" or "minutes"
 * @returns a number representing the total seconds
 */
export function minuteSecondStringToNum(timeString: string): number {
    let minutes = 0, seconds = 0;

    if (timeString.includes(":")) {
        [minutes, seconds] = timeString.split(":").map(Number);
    } else {
        minutes = parseInt(timeString);
        seconds = 0;
    }

    const totalSeconds = minutes * 60 + seconds;

    return totalSeconds;
}

/**
 * Takes a number representing total seconds and returns a string in the format "minutes:seconds".
 * 
 * @param totalSeconds number representing the total seconds
 * @returns a string in the format "minutes:seconds"
 */
export function numToMinuteSecond(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60); // floor to exclude the seconds
    const seconds = totalSeconds % 60; // the remainder is the seconds

    return `${minutes}:${seconds.toString().padStart(2, "0")}`; // pad seconds with zeros for consistency
}

/**
 * Adds two strings of the format "minutes:seconds" or "minutes" together.
 * Returns the total in seconds or as a string in the "minutes:seconds" format as specified.
 * 
 * @param timeString1 first string of the format "minutes:seconds" or "minutes"
 * @param timeString2 second string of the format "minutes:seconds" or "minutes"
 * @param formatted boolean specifying whether the function should return a formatted string or not
 * @returns the total in seconds or as a string in the "minutes:seconds" format as specified
 */
export function addMinuteSecond(timeString1: string, timeString2: string, formatted=false): number | string {
    const totalSeconds1 = minuteSecondStringToNum(timeString1);
    const totalSeconds2 = minuteSecondStringToNum(timeString2);

    const summedSeconds = totalSeconds1 + totalSeconds2;

    if (formatted) {
        return numToMinuteSecond(summedSeconds);
    } else {
        return summedSeconds;
    }
}