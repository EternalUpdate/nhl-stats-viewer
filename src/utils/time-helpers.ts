/**
 * Takes a string in the format "minutes:seconds" and returns a number representing the total seconds represented by the string (including the minutes).
 * 
 * @param timeString string in the format "minutes:seconds"
 * @returns a number representing the total seconds
 */
export function minuteSecondStringToNum(timeString: string): number {
    const [minutes, seconds] = timeString.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;

    return totalSeconds;
}

/**
 * Takes a number representing total seconds and returns a string in the format "minutes:seconds".
 * @param totalSeconds number representing the total seconds
 * @returns a string in the format "minutes:seconds"
 */
export function numToMinuteSecond(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60); // floor to exclude the seconds
    const seconds = totalSeconds % 60; // the remainder is the seconds

    return `${minutes}:${seconds.toString().padStart(2, "0")}`; // pad seconds with zeros for consistency
}