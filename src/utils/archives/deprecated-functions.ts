import { addPlayerStatsRows, transpose } from "../matrix-manip";

/**
 * Returns an array of all the years the player has active stats in the NHL.
 * The array contains unique pairs of years [startYear, endYear].
 * 
 * @param json the JSON string from the NHL API yearByYear call
 * @returns an array of all the years the player has active stats in the NHL
 */
export function getAllNHLYears(json: string): number[][] {
    const years: number[][] = [];
    const data = JSON.parse(json).stats[0].splits;
    let lastYearStart = 0; // to check for duplicates (api data is sorted)

    for (const i in data) {
        const league: string = data[i].league.name;

        if (league == "National Hockey League") {
            const yearString: string = data[i].season;
            const yearPair: number[] = [];

            // parse string into number pair
            const yearStart: number = parseInt(yearString.substring(0, 4));
            const yearEnd: number = parseInt(yearString.substring(4));

            // add only if not duplicate
            if (yearStart !== lastYearStart) {                
                yearPair.push(yearStart);
                yearPair.push(yearEnd);
    
                years.push(yearPair);

                lastYearStart = yearStart; // update for next duplicate check
            }
        }
    }

    return years;
}

/**
 * Creates labels in the format startYear-endYear from the player's active NHL seasons.
 * 
 * @param yearPairs (optional) a 2D array containing pairs of years
 * @param json (optional) the JSON string from a yearByYear NHL API call to generate the year pairs from
 * @returns labels in the format startYear-endYear
 */
export function getLabelsFromNHLYears(yearPairs?: number[][], json?: string): string[] {
    const labels: string[] = [];

    if (json) {
        yearPairs = getAllNHLYears(json);
    }

    if (yearPairs) {
        for (const pair of yearPairs) {
            const label = `${pair[0]}-${pair[1]}`
            labels.push(label);
        }
    }

    return labels;
}



/**
 * Returns an array containing the NHL stats of the queried player with the
 * stats categories in the columns and the seasons in the rows.
 * 
 * @param json the JSON string from the NHL API yearByYear call
 * @returns an array containing the NHL stats of the queried player with the
 * stats categories in the columns and the seasons in the rows
 */
export function getPlayerStatsPerYear(json: string): (number | string)[][] {
    const data = JSON.parse(json).stats[0].splits;
    let lastYearStart = 0; // to check for duplicates (api data is sorted)
    const statsPerYear: (number | string)[][] = [];

    for (const i in data) {
        const league: string = data[i].league.name;
        const currentRow: (number | string)[] = [];

        if (league == "National Hockey League") {
            const yearString: string = data[i].season;
            const yearStart: number = parseInt(yearString.substring(0, 4));

            // populate stat year row
            for (const statName in data[i].stat) {
                currentRow.push(data[i].stat[statName]);
            }

            // add preceding row to current row if same season (changed team)
            if (yearStart === lastYearStart) {
                // get previous row
                const previousRow = statsPerYear[statsPerYear.length-1];
                // add to current row and update
                statsPerYear[statsPerYear.length-1]= addPlayerStatsRows(previousRow, currentRow);
            } else {
                // add stat row to final array
                statsPerYear.push(currentRow);
            }

            lastYearStart = yearStart;
        }
    }
    
    return statsPerYear;
}

/**
 * Returns an array containing grouped stats over the years (i.e. all goals per year in one row, etc.).
 * 
 * @param json JSON string from the NHL API call to yearByYear or single season stats
 * @returns an array containing grouped stats over the years
 */
export function getGroupedStatsOverTheYears(json: string): (number | string)[][] {
    let groupedStats: (number | string)[][] = getPlayerStatsPerYear(json);
    groupedStats = transpose(groupedStats);

    return groupedStats;
}

/**
 * Returns an array containing a record of a single type of stat over the player's active NHL years.
 * 
 * @param json JSON string from the NHL API call to yearByYear or single season stats
 * @param statType string representing the name of the statistic as used in the NHL API
 * @returns an array containing a record of a single type of stat over the player's active NHL years
 */
export function getSingleStatOverTheYears(json: string, statType: string): (number | string)[] {
    const index = getStatTypeIndex(statType, json);
    const groupedStats = getGroupedStatsOverTheYears(json);

    if (index) {
        return groupedStats[index];
    }

    return [-1];
}

/**
 * Returns the headers for the individual player stats for a JSON string from the
 * yearByYear and individual season NHL API calls.
 * 
 * @param json JSON string from the yearByYear and individual season NHL API calls
 * @returns an array of strings containing the headers for the individual player stats
 */
export function getStatTypesHeaders(json: string): string[] {
    const data = JSON.parse(json).stats[0].splits;
    const statTypesHeaders: string[] = [];

    for (const i in data) {
        const league: string = data[i].league.name;

        if (league == "National Hockey League") {
            for (const statName in data[i].stat) {
                statTypesHeaders.push(statName);
            }

            break;
        }
    }
    
    return statTypesHeaders;
}

/**
 * Finds the index for a given stat type. For use with the stats per year and over the years methods.
 * 
 * @param statType string representing the name of the statistic as used in the NHL API
 * @param json JSON string from the yearByYear and individual season NHL API calls
 * @returns the index for a given stat type
 */
export function getStatTypeIndex(statType: string, json: string): number | undefined {
    const headers = getStatTypesHeaders(json);
    const index = headers.findIndex((header) => header.toLowerCase() === statType.toLowerCase());

    return index;
}