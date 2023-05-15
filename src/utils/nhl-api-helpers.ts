import { transpose, addPlayerStatsRows } from "./matrix-manip";
import { PlayerSeasonStats } from "../types/PlayerSeasonStats";

// functions for use in charts (progress over time)
// TODO: consider converting the first few functions into async functions that take the playerID

/**
 * Gets player stats for the given season.
 * 
 * @param playerID number reprenting the playerID
 * @param season string representing the desired season in the format "yearStartyearEnd", "20222023"
 * @returns a PlayerSeasonStats object containing the player's stats for the specified season
 */
async function getSeasonPlayerStats(playerID: number, season: string): Promise<PlayerSeasonStats | null> {
    try {
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeason&season=${season}`);
        const data = await response.json();
        const stats = data.stats[0].splits[0].stat;

        const playerStats: PlayerSeasonStats = {
            timeOnIce: stats.timeOnIce,
            assists: stats.assists,
            goals: stats.goals,
            pim: stats.pim,
            shots: stats.shots,
            games: stats.games,
            hits: stats.hits,
            powerPlayGoals: stats.powerPlayGoals,
            powerPlayPoints: stats.powerPlayPoints,
            powerPlayTimeOnIce: stats.powerPlayPoints,
            evenTimeOnIce: stats.evenTimeOnIce,
            penaltyMinutes: stats.penaltyMinutes,
            faceOffPct: stats.faceOffPct,
            shotPct: stats.shotPct,
            gameWinningGoals: stats.gameWinningGoals,
            overTimeGoals: stats.overTimeGoals,
            shortHandedGoals: stats.shortHandedGoals,
            shortHandedPoints: stats.shortHandedPoints,
            shortHandedTimeOnIce: stats.shortHandedTimeOnIce,
            blocked: stats.blocked,
            plusMinus: stats.plusMinus,
            points: stats.points,
            shifts: stats.shifts,
            timeOnIcePerGame: stats.timeOnIcePerGame,
            evenTimeOnIcePerGame: stats.evenTimeOnIcePerGame,
            shortHandedTimeOnIcePerGame: stats.shortHandedTimeOnIcePerGame,
            powerPlayTimeOnIcePerGame: stats.powerPlayTimeOnIcePerGame,
        }

        console.log(playerStats);
        
        return playerStats;
    } catch (error) {
        console.log("getSeasonPlayerStats(): ", error);
        return null;
    }
}

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

/**
 * Searches a given team for a player and returns a Promise to an array of players that match the name.
 * 
 * @param name string representing the name of the desired player
 * @param teamID number representing the ID of the team to search as present in the NHL API
 * @returns a Promise to an array of players that match the name
 */
export async function searchTeamForPlayer (name: string, teamID: number): Promise<any> {
    try {
      const response = await fetch(
        `https://statsapi.web.nhl.com/api/v1/teams/${teamID}/roster`
      );
      const data = await response.json();
  
      // Extract the player data from the roster
      const players = data.roster.map((player: any) => player.person);
  
      // Filter the players based on the name
      const filteredPlayers = players.filter((player: any) =>
        player.fullName.toLowerCase().includes(name.toLowerCase())
      );
  
      return filteredPlayers;
    } catch (error) {
      console.log("searchTeamForPlayer(): ", error);
    }
}

/**
 * Searches the league for a given player and returns a Promise to an array of players that match that name.
 * 
 * @param name string representing the name of the desired player
 * @returns a Promise to an array of players that match that name
 */
export async function searchLeagueForPlayer(name: string): Promise<any[]> {
    try {
      const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/`);
      const data = await response.json();
  
      const searchPromises = data.teams.map((team: any) => searchTeamForPlayer(name, team.id));
  
      const foundPlayers = await Promise.all(searchPromises);
        
      // Extract the first element from each non-empty array
      const filteredPlayers = foundPlayers
        .filter((players: any[]) => players.length > 0)
        .map((players: any[]) => players[0] || null);
  
      return filteredPlayers;
    } catch (error) {
      console.log("searchLeagueForPlayer(): ", error);
      return []; // Return an empty array as a fallback
    }
}

/**
 * Returns a Promise to the given player's information from the people portion of the NHL API.
 * 
 * @param playerID number corresponding to the desired player
 * @returns a Promise to the given player's information
 */
export async function getPlayerInfo(playerID: number): Promise<any> {
    try {
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}`)
        const data = await response.json();

        const playerInfo = data.people[0];

        return playerInfo;
    } catch (error) {
        console.log("getPlayerInfo(): ", error);
    }
}

/**
 * Returns the abbreviation of the team the given player plays for.
 * 
 * @param playerID number representing the desired player
 * @returns the abbreviation of the team the given player plays for
 */
export async function getTeamAbbrFromPlayer(playerID: number): Promise<any> {
    try {
        const playerInfo = await getPlayerInfo(playerID);
        const teamID = await playerInfo.currentTeam?.id;

        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamID}`);
        const data = await response.json();

        return data.teams[0].abbreviation;
    } catch (error) {
        console.log("getTeamAbbrFromPlayer(): ", error);
    }
}

/**
 * Returns a Promise to an array containing all team IDs in the league available in the NHL API.
 */
export async function getAllTeamIDs(): Promise<number[]> {
    try {
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/`);
        const data = await response.json();

        const teamIDs = data.teams.map((team: any) => team.id);
        
        return teamIDs;
    } catch (error) {
        console.log("getAllTeamIDs(): ", error); 
        return [];
    }
}

/**
 * Returns a Promise to an array containing all player IDs in the league availbale in the NHL API.
 */
export async function getAllPlayerIDs(): Promise<number[]> {
    try {
        const playerIDs: number[] = [];
        const teamIDs = await getAllTeamIDs();

        // wait for all async requests to complete before moving on
        await Promise.all(
            teamIDs.map(async (teamID: number) => {
            const response = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${teamID}/roster`);
            const data = await response.json();
            const roster = data.roster;            
            
            roster.forEach((playerData: any) => playerIDs.push(playerData.person.id));
            })
        )
        
        return playerIDs;
    } catch (error) {
        console.log("getAllPlayerIDs(): ", error);
        return [];
    }
}

export async function getPlayerCareerAverages(playerID: number): Promise<(number | string)[]> {
    try {
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=careerRegularSeason`);
        const data = await response.json();
        const careerTotals = data.stats[0].splits[0].stat;        

        return careerTotals;
    } catch (error) {
        console.log("getPlayerCareerAverages(): ", error);
        return [];
    }
}

// test queries

getPlayerCareerAverages(8476981);

// getAllPlayerIDs().then((ids) => console.log(ids)).catch((error) => console.log(error));

// getTeamAbbrFromPlayer(8476981).then((info) => console.log(info)).catch((error) => console.log("Error"));
// getPlayerInfo(8476981).then((info) => console.log(info)).catch((error) => console.log("Error"));

// searchTeamForPlayer("J", 8).then((players) => console.log(players)).catch((error) => console.log("Error"));
// searchLeagueForPlayer("Josh").then((players) => console.log(players)).catch((error) => console.log("Error"));

// const requestOptions: RequestInit = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   fetch("https://statsapi.web.nhl.com/api/v1/teams/", requestOptions)
//      .then(response => response.json())
//     .then((result) => { 
//       console.log(result.teams);})
//       .catch(error => console.log("error", error));

// fetch("https://statsapi.web.nhl.com/api/v1/people/8476981/stats?stats=yearByYear", requestOptions)
//     .then(response => response.text())
//     .then((result) => { 
//         console.log("Andy's:\n");
//         console.log(getAllNHLYears(result));
//         console.log(getLabelsFromNHLYears(undefined, result));
//         console.log(getPlayerStatsPerYear(result));
//         console.log(getStatTypesHeaders(result));
//         console.log(getGroupedStatsOverTheYears(result));
//         console.log(JSON.parse(result).stats[0].splits);
//     })
//     .catch(error => console.log('error', error));

// fetch("https://statsapi.web.nhl.com/api/v1/people/8477500/stats?stats=yearByYear", requestOptions)
//     .then(response => response.text())
//     .then((result) => { 
//         console.log("Horvat's:\n");
//         console.log(getAllNHLYears(result));
//         console.log(JSON.parse(result).stats[0].splits) 
//     })
//     .catch(error => console.log('error', error));