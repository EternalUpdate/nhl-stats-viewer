import { PlayerSeasonStats, addPlayerSeasonStats } from "../types/PlayerSeasonStats";

/**
 * Gets player stats for the given season.
 * 
 * @param playerID number reprenting the playerID
 * @param season string representing the desired season in the format "yearStartyearEnd", "20222023"
 * @param playoffs boolean true if playoff stats should be fetched for the given season
 * @returns a PlayerSeasonStats object containing the player's stats for the specified season
 */
export async function getSeasonPlayerStats(playerID: number, season: string, playoffs=false): Promise<PlayerSeasonStats | null> {
    try {
        let response;

        if (playoffs) {
            response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeasonPlayoffs&season=${season}`);
        } else {
            response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=statsSingleSeason&season=${season}`);
        }
        
        const data = await response.json();
        const stats = data.stats[0].splits[0].stat;

        const playerStats: PlayerSeasonStats = {
            season: data.stats[0].splits[0].season,
            timeOnIce: stats.timeOnIce,
            assists: stats.assists,
            goals: stats.goals,
            pim: stats.pim,
            shots: stats.shots,
            games: stats.games,
            hits: stats.hits,
            powerPlayGoals: stats.powerPlayGoals,
            powerPlayPoints: stats.powerPlayPoints,
            powerPlayTimeOnIce: stats.powerPlayTimeOnIce,
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
 * Get player stats for every active NHL season that the player played.
 * 
 * @param playerID number representing the player ID of the desired player
 * @returns an array container a PlayerSeasonStats object for each of the seasons
 */
export async function getAllSeasonsPlayerStats(playerID: number): Promise<PlayerSeasonStats[]> {
    try {
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerID}/stats?stats=yearByYear`);
        const data = await response.json();
        const allSeasons = data.stats[0].splits;
        let lastYear = "";
        const allSeasonsPlayerStats: PlayerSeasonStats[] = [];

        for (const season of allSeasons) {
            if (season.league.name === "National Hockey League") {
                const stats = season.stat;                
                const currentPlayerSeasonStats: PlayerSeasonStats = {
                    season: season.season,
                    timeOnIce: stats.timeOnIce,
                    assists: stats.assists,
                    goals: stats.goals,
                    pim: stats.pim,
                    shots: stats.shots,
                    games: stats.games,
                    hits: stats.hits,
                    powerPlayGoals: stats.powerPlayGoals,
                    powerPlayPoints: stats.powerPlayPoints,
                    powerPlayTimeOnIce: stats.powerPlayTimeOnIce,
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

                if (lastYear === season.season) {
                    // get previous row
                    const previousPlayerSeasonStats = allSeasonsPlayerStats[allSeasonsPlayerStats.length-1];
                    // add to current row and update
                    allSeasonsPlayerStats[allSeasonsPlayerStats.length-1] = addPlayerSeasonStats(previousPlayerSeasonStats, currentPlayerSeasonStats);
                } else {
                    // add stats directly to final array
                    allSeasonsPlayerStats.push(currentPlayerSeasonStats);
                }

                lastYear = season.season;
            }
        }        
        
        return allSeasonsPlayerStats;
    } catch (error) {
        console.log("getAllSeasonsPlayerStats: ", error);
        return [];
    }
}

/**
 * Get the progression of a specific stat over all of the player's active NHL seasons.
 * 
 * @param statType string representing the type of statistic as stored in PlayerSeasonStats objects
 * @param allSeasonsStats optional array of PlayerSeasonStats to gather the stat from over the seasons
 * @param playerID optional number player ID to fetch the season stats if none are provided
 * @returns an array containing the value of the stat for each season
 */
export async function getSingleStatOverTheSeasons(statType: string, allSeasonsStats?: PlayerSeasonStats[], playerID?: number): Promise<(number | string)[]> {
    if (!allSeasonsStats && playerID) {
        try {
            allSeasonsStats = await getAllSeasonsPlayerStats(playerID);
        } catch (error) {
            console.log("getSingleStatOverTheSeasons(): ", error);
            return [];
        }
    }

    if (allSeasonsStats) {
        const statOverTime: (number | string)[] = allSeasonsStats.map((seasonStats: PlayerSeasonStats) => {
            const value = seasonStats[statType];
            return value !== undefined ? value : 0; // Handle undefined values
        });
        
        return statOverTime;
    }

    return [];
}

/**
 * Gets all of the NHL seasons either present in the NHL API or all the active NHL seasons for a given player or a given PlayerSeasonStats array.
 * 
 * @param allSeasonsStats optional PlayerSeasonStats array used to group the seasons
 * @param playerID optional player ID to fetch all season stats if none were given
 * @returns an array of strings containing the seasons in the format "yearStartyearEnd", "20222023"
 */
export async function getAllNHLSeasons(allSeasonsStats?: PlayerSeasonStats[], playerID?: number): Promise<string[]> {
    // no info specified -- get all seasons available in the NHL API
    if (!allSeasonsStats && !playerID) {
        try {
            const response = await fetch(`https://statsapi.web.nhl.com/api/v1/seasons/`);
            const data = await response.json();
            const seasons = data.seasons;

            const allSeasonYears: string[] = seasons.map((season: any) => season.seasonId);

            console.log(allSeasonYears);
            

            return allSeasonYears;
        } catch (error) {
            console.log("getAllNHLSeasons(): ", error);
            return [];
        }
    }

    // get all seasons data as necessary if a specific player is given
    if (!allSeasonsStats && playerID) {
        try {
            allSeasonsStats = await getAllSeasonsPlayerStats(playerID);
        } catch (error) {
            console.log("getAllNHLSeasons(): ", error);
            return [];
        }
    }

    // group the seasons together
    if (allSeasonsStats) {
        const allSeasonYears: string[] = allSeasonsStats.map((seasonStats: PlayerSeasonStats) => seasonStats.season);
        
        return allSeasonYears;
    }

    return [];
}

/**
 * Creates labels for every active NHL season the player played in.
 * 
 * @param allSeasonsStats optional PlayerSeasonStats array used to group the seasons
 * @param playerID optional player ID to fetch all season stats if none were given
 * @returns an array of strings representing season labels in the format "yearStart-yearEnd", "2022-2023"
 */
export async function getAllSeasonLabels(allSeasonsStats?: PlayerSeasonStats[], playerID?: number): Promise<string[]> {
    // get all seasons data as necessary if a specific player is given
    if (!allSeasonsStats && playerID) {
        try {
            allSeasonsStats = await getAllSeasonsPlayerStats(playerID);
        } catch (error) {
            console.log("getAllNHLSeasons(): ", error);
            return [];
        }
    }

    if (allSeasonsStats) {
        const allSeasonYears = await getAllNHLSeasons(allSeasonsStats);
        const formattedYears = allSeasonYears.map((season: string) => {
            const yearStart = parseInt(season.substring(0, 4));
            const yearEnd = parseInt(season.substring(4));

            return `${yearStart}-${yearEnd}`;
        })
        
        return formattedYears;
    }

    return [];
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


// test queries

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