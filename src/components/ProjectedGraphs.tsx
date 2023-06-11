import PlayerStatLineChart from "../components/PlayerStatLineChart";
import { Section } from "../components/Section";
import {
    PlayerSeasonStats,
    convertAllSeasonsStatsToProjections,
} from "../types/PlayerSeasonStats";

interface ProjectedGraphsProps {
    playerID: number;
    playerStats: PlayerSeasonStats[];
}

const ProjectedGraphs = ({ playerID, playerStats }: ProjectedGraphsProps) => {
    const projectedStats = convertAllSeasonsStatsToProjections(playerStats);

    return (
        <>
            <Section title="Production" mtBase="16" mtMd="8">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["goals", "assists", "points"]}
                    title="Goals, Assists, and Points"
                    allSeasonsStats={projectedStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shots"]}
                    title="Shots"
                    allSeasonsStats={projectedStats}
                />
            </Section>

            <Section title="Physicality">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["hits"]}
                    title="Hits"
                    allSeasonsStats={projectedStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["pim"]}
                    title="Penalty Minutes"
                    allSeasonsStats={projectedStats}
                />
            </Section>

            <Section title="Special Units">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["powerPlayGoals", "powerPlayPoints"]}
                    title="Power Play (Production)"
                    allSeasonsStats={projectedStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shortHandedGoals", "shortHandedPoints"]}
                    title="Penalty Kill"
                    allSeasonsStats={projectedStats}
                />
            </Section>

            <Section title="Defense">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["blocked"]}
                    title="Blocked Shots"
                    allSeasonsStats={projectedStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["plusMinus"]}
                    title="Plus Minus"
                    allSeasonsStats={projectedStats}
                />
            </Section>
        </>
    );
};

export default ProjectedGraphs;
