import PlayerStatLineChart from "../components/PlayerStatLineChart";
import { Section } from "../components/Section";
import { Subsection } from "../components/Subsection";
import { PlayerSeasonStats } from "../types/PlayerSeasonStats";
import { convertAllSeasonsStatsToPerGame } from "../types/PlayerSeasonStats";

interface PerGameGraphsProps {
    playerID: number;
    playerStats: PlayerSeasonStats[];
}

const PerGameGraphs = ({ playerID, playerStats }: PerGameGraphsProps) => {
    const perGameStats = convertAllSeasonsStatsToPerGame(playerStats);

    return (
        <>
            <Section title="Production" mtBase="16" mtMd="8">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["goals", "assists", "points"]}
                    title="Goals, Assists, and Points"
                    allSeasonsStats={perGameStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shots"]}
                    title="Shots"
                    allSeasonsStats={perGameStats}
                />
            </Section>

            <Section title="Utilization">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["timeOnIcePerGame"]}
                    title="Average Time On Ice"
                    allSeasonsStats={perGameStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["evenTimeOnIcePerGame"]}
                    title="Average Even Strength Time"
                    allSeasonsStats={perGameStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shifts"]}
                    title="Shifts"
                    allSeasonsStats={perGameStats}
                />
            </Section>

            <Section title="Physicality">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["hits"]}
                    title="Hits"
                    allSeasonsStats={perGameStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["pim"]}
                    title="Penalty Minutes"
                    allSeasonsStats={perGameStats}
                />
            </Section>

            <Section title="Special Units">
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["powerPlayGoals", "powerPlayPoints"]}
                        title="Power Play (Production)"
                        allSeasonsStats={perGameStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["powerPlayTimeOnIcePerGame"]}
                        title="Power Play (Average TOI)"
                        allSeasonsStats={perGameStats}
                    />
                </Subsection>

                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shortHandedGoals", "shortHandedPoints"]}
                        title="Penalty Kill"
                        allSeasonsStats={perGameStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shortHandedTimeOnIcePerGame"]}
                        title="Penalty Kill (Average TOI)"
                        allSeasonsStats={perGameStats}
                    />
                </Subsection>
            </Section>

            <Section title="Defense">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["blocked"]}
                    title="Blocked Shots"
                    allSeasonsStats={perGameStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["plusMinus"]}
                    title="Plus Minus"
                    allSeasonsStats={perGameStats}
                />
            </Section>
        </>
    );
};

export default PerGameGraphs;
