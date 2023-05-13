/**
 * Takes a string in the format "minutes:seconds" and returns a number representing the total seconds represented by the string (including the minutes).
 * 
 * @param timeString string in the format "minutes:seconds"
 * @returns a number representing the total seconds
 */
function minuteSecondStringToNum(timeString: string): number {
    const [minutes, seconds] = timeString.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;

    return totalSeconds;
}