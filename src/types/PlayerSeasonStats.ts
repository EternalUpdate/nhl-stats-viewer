import { addMinuteSecond } from "../utils/time-helpers";

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
  [key: string]: any;
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

