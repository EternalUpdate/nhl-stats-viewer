import { transpose, addPlayerStatsRows } from "./matrix-manip";

// functions for use in charts (progress over time)

/**
 * Returns an array of all the years the player has active stats in the NHL.
 * The array contains unique pairs of years [startYear, endYear].
 * 
 * @param json the JSON string from the NHL API yearByYear call
 * @returns an array of all the years the player has active stats in the NHL
 */
function getAllNHLYears(json: string): number[][] {
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
 * Mapping individual stats types to their index numbers.
 */
const IndividualStatsTypes = {
    assists: 0,
    blocked: 1,
    evenTimeOnIce: 2,
    faceOffPct: 3,
    gameWinningGoals: 4,
    games: 5,
    goals: 6,
    hits: 7,
    overTimeGoals: 8,
    penaltyMinutes: 9, // string
    pim: 10,
    plusMinus: 11,
    points: 12,
    powerPlayGoals: 13,
    powerPlayPoints: 14,
    powerPlayTimeOnIce: 15, // string
    shifts: 16,
    shortHandedGoals: 17,
    shortHandedPoints: 18,
    shortHandedTimeOnIce: 19, // string
    shotPct: 20,
    shots: 21,
    timeOnIce: 22, // string
} as const;

/**
 * Returns an array containing the NHL stats of the queried player with the
 * stats categories in the columns and the seasons in the rows.
 * 
 * @param json the JSON string from the NHL API yearByYear call
 * @returns an array containing the NHL stats of the queried player with the
 * stats categories in the columns and the seasons in the rows
 */
function getStatsPerYear(json: string): (number | string)[][] {
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
            for (const stat in data[i].stat) {
                currentRow.push(stat);
            }

            // add preceding row to current row if same season (changed team)
            if (yearStart === lastYearStart) {
                // get previous row
                let previousRow = statsPerYear[statsPerYear.length-1];
                // add to current row and update
                previousRow = addPlayerStatsRows(previousRow, currentRow);
            } else {
                // add stat row to final array
                statsPerYear.push(currentRow);
            }

            lastYearStart = yearStart;
        }
    }
    
    return statsPerYear;
}

// test queries
const requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

fetch("https://statsapi.web.nhl.com/api/v1/people/8476981/stats?stats=yearByYear", requestOptions)
    .then(response => response.text())
    .then((result) => { 
        console.log("Andy's:\n");
        console.log(getAllNHLYears(result));
        console.log(JSON.parse(result).stats[0].splits) 
    })
    .catch(error => console.log('error', error));

fetch("https://statsapi.web.nhl.com/api/v1/people/8477500/stats?stats=yearByYear", requestOptions)
    .then(response => response.text())
    .then((result) => { 
        console.log("Horvat's:\n");
        console.log(getAllNHLYears(result));
        console.log(JSON.parse(result).stats[0].splits) 
    })
    .catch(error => console.log('error', error));