import { addMinuteSecond, divideMinuteSecond, multiplyMinuteSecond } from "../utils/time-helpers";

/**
 * Player season stats as returned by NHL API calls for yearByYear, singleSeason, and careerRegularSeason, among others.
 */
export type PlayerSeasonStats = {
  season: string;
  timeOnIce: string;
  assists: number;
  goals: number;
  pim: number;
  shots: number;
  games: number;
  hits: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  powerPlayTimeOnIce: string;
  evenTimeOnIce: string;
  penaltyMinutes: string;
  faceOffPct: number;
  shotPct: number;
  gameWinningGoals: number;
  overTimeGoals: number;
  shortHandedGoals: number;
  shortHandedPoints: number;
  shortHandedTimeOnIce: string;
  blocked: number;
  plusMinus: number;
  points: number;
  shifts: number;
  timeOnIcePerGame: string; // these last four are only included in the career totals endpoints
  evenTimeOnIcePerGame: string;
  shortHandedTimeOnIcePerGame: string;
  powerPlayTimeOnIcePerGame: string;
  [key: string]: any; // so the fields can be accessed e.g. ["goals"]
};

/**
 * Adds two PlayerSeasonStats together.
 * 
 * @param stats1 first PlayerSeasonStats object
 * @param stats2 second PlayerSeasonStats object
 * @returns a new PlayerSeasonsStats object containing the sum of the other two for each statistic
 */
export function addPlayerSeasonStats(stats1: PlayerSeasonStats, stats2: PlayerSeasonStats): PlayerSeasonStats {
  return {
      season: stats1.season,
      timeOnIce: addMinuteSecond(stats1.timeOnIce, stats2.timeOnIce),
      assists: stats1.assists + stats2.assists,
      goals: stats1.goals + stats2.goals,
      pim: stats1.pim + stats2.pim,
      shots: stats1.shots + stats2.shots,
      games: stats1.games + stats2.games,
      hits: stats1.hits + stats2.hits,
      powerPlayGoals: stats1.powerPlayGoals + stats2.powerPlayGoals,
      powerPlayPoints: stats1.powerPlayPoints + stats2.powerPlayPoints,
      powerPlayTimeOnIce: addMinuteSecond(stats1.powerPlayTimeOnIce, stats2.powerPlayTimeOnIce),
      evenTimeOnIce: addMinuteSecond(stats1.evenTimeOnIce, stats2.evenTimeOnIce),
      penaltyMinutes: stats1.penaltyMinutes + stats2.penaltyMinutes,
      faceOffPct: stats1.faceOffPct + stats2.faceOffPct,
      shotPct: stats1.shotPct + stats2.shotPct,
      gameWinningGoals: stats1.gameWinningGoals + stats2.gameWinningGoals,
      overTimeGoals: stats1.overTimeGoals + stats2.overTimeGoals,
      shortHandedGoals: stats1.shortHandedGoals + stats2.shortHandedGoals,
      shortHandedPoints: stats1.shortHandedPoints + stats2.shortHandedPoints,
      shortHandedTimeOnIce: addMinuteSecond(stats1.shortHandedTimeOnIce, stats2.shortHandedTimeOnIce),
      blocked: stats1.blocked + stats2.blocked,
      plusMinus: stats1.plusMinus + stats2.plusMinus,
      points: stats1.points + stats2.points,
      shifts: stats1.shifts + stats2.shifts,
      timeOnIcePerGame: addMinuteSecond(stats1.timeOnIcePerGame, stats2.timeOnIcePerGame),
      evenTimeOnIcePerGame: addMinuteSecond(stats1.evenTimeOnIcePerGame, stats2.evenTimeOnIcePerGame),
      shortHandedTimeOnIcePerGame: addMinuteSecond(stats1.shortHandedTimeOnIcePerGame, stats2.shortHandedTimeOnIcePerGame),
      powerPlayTimeOnIcePerGame: addMinuteSecond(stats1.powerPlayTimeOnIcePerGame, stats2.powerPlayTimeOnIcePerGame),
  };
}

/**
 * Calculates the season stats at a per game rate where applicable.
 * Where it's not applicable, it preserves the original value.
 * 
 * @param stats original PlayerSeasonStats
 * @returns the season stats at a per game rate where applicable
 */
export function getPlayerSeasonStatsPerGame(stats: PlayerSeasonStats): PlayerSeasonStats {
  const games = stats.games;

  return {
    season: stats.season,
    timeOnIce: stats.timeOnIce,
    assists: stats.assists / games,
    goals: stats.goals / games,
    pim: stats.pim / games,
    shots: stats.shots / games,
    games: stats.games,
    hits: stats.hits / games,
    powerPlayGoals: stats.powerPlayGoals / games,
    powerPlayPoints: stats.powerPlayPoints / games,
    powerPlayTimeOnIce: stats.powerPlayTimeOnIce,
    evenTimeOnIce: stats.evenTimeOnIce,
    penaltyMinutes: divideMinuteSecond(stats.penaltyMinutes, games),
    faceOffPct: stats.faceOffPct,
    shotPct: stats.shotPct,
    gameWinningGoals: stats.gameWinningGoals,
    overTimeGoals: stats.overTimeGoals,
    shortHandedGoals: stats.shortHandedGoals / games,
    shortHandedPoints: stats.shortHandedPoints / games,
    shortHandedTimeOnIce: stats.shortHandedTimeOnIce,
    blocked: stats.blocked / games,
    plusMinus: stats.plusMinus / games,
    points: stats.points / games,
    shifts: stats.shifts / games,
    timeOnIcePerGame: divideMinuteSecond(stats.timeOnIce, games),
    evenTimeOnIcePerGame: divideMinuteSecond(stats.evenTimeOnIce, games),
    shortHandedTimeOnIcePerGame: divideMinuteSecond(stats.shortHandedTimeOnIce, games),
    powerPlayTimeOnIcePerGame: divideMinuteSecond(stats.powerPlayTimeOnIce, games)
  }
}

/**
 * Calculates the projected season stats over 82 games based on the per game rate where applicable.
 * @param stats original PlayerSeasonStats (the per game rate is calculated in the function)
 * @returns the projected season stats over 82 games where applicable
 */
export function getProjectedPlayerSeasonStats(stats: PlayerSeasonStats): PlayerSeasonStats {
  const perGameStats = getPlayerSeasonStatsPerGame(stats);
  const fullSeason = 82;

   return {
    season: perGameStats.season,
    timeOnIce: perGameStats.timeOnIce,
    assists: perGameStats.assists * fullSeason,
    goals: perGameStats.goals * fullSeason,
    pim: perGameStats.pim * fullSeason,
    shots: perGameStats.shots * fullSeason,
    games: perGameStats.games,
    hits: perGameStats.hits * fullSeason,
    powerPlayGoals: perGameStats.powerPlayGoals * fullSeason,
    powerPlayPoints: perGameStats.powerPlayPoints * fullSeason,
    powerPlayTimeOnIce: perGameStats.powerPlayTimeOnIce,
    evenTimeOnIce: perGameStats.evenTimeOnIce,
    penaltyMinutes: multiplyMinuteSecond(perGameStats.penaltyMinutes, fullSeason),
    faceOffPct: perGameStats.faceOffPct,
    shotPct: perGameStats.shotPct,
    gameWinningGoals: perGameStats.gameWinningGoals,
    overTimeGoals: perGameStats.overTimeGoals,
    shortHandedGoals: perGameStats.shortHandedGoals * fullSeason,
    shortHandedPoints: perGameStats.shortHandedPoints * fullSeason,
    shortHandedTimeOnIce: perGameStats.shortHandedTimeOnIce,
    blocked: perGameStats.blocked * fullSeason,
    plusMinus: perGameStats.plusMinus * fullSeason,
    points: perGameStats.points * fullSeason,
    shifts: perGameStats.shifts * fullSeason,
    timeOnIcePerGame: perGameStats.timeOnIcePerGame,
    evenTimeOnIcePerGame: perGameStats.evenTimeOnIcePerGame,
    shortHandedTimeOnIcePerGame: perGameStats.shortHandedTimeOnIcePerGame,
    powerPlayTimeOnIcePerGame: perGameStats.powerPlayTimeOnIcePerGame
   }
}

/**
 * Converts the given PlayerSeasonStats to per game stats where appropriate.
 * 
 * @param allSeasonsPlayerStats PlayerSeasonStats array to convert
 * @returns a PlayerSeasonStats array with per game stats where appropriate
 */
export function convertAllSeasonsStatsToPerGame(allSeasonsPlayerStats: PlayerSeasonStats[]): PlayerSeasonStats[] {
  const statsPerGame: PlayerSeasonStats[] = [];

  for (const seasonStats of allSeasonsPlayerStats) {
      statsPerGame.push(getPlayerSeasonStatsPerGame(seasonStats));
  }

  return statsPerGame;
}

/**
 * Converts the given PlayerSeasonStats to projected stats over 82 games where appropriate.
 * 
 * @param allSeasonsPlayerStats PlayerSeasonStats array to convert
 * @returns a PlayerSeasonStats array with projected stats over 82 games where appropriate
 */
export function convertAllSeasonsStatsToProjections(allSeasonsPlayerStats: PlayerSeasonStats[]): PlayerSeasonStats[] {
  const projections: PlayerSeasonStats[] = [];

  for (const seasonStats of allSeasonsPlayerStats) {
      projections.push(getProjectedPlayerSeasonStats(seasonStats));
  }

  return projections;
}