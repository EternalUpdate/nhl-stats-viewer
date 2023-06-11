import PlayerStatLineChart from "../components/PlayerStatLineChart";
import { Section } from "../components/Section";
import { Subsection } from "../components/Subsection";
import { PlayerSeasonStats } from "../types/PlayerSeasonStats";

interface TotalsGraphsProps {
    playerID: number;
    playerStats: PlayerSeasonStats[];
}

const TotalsGraphs = ({ playerID, playerStats }: TotalsGraphsProps) => {
    return (
        <>
            <Section title="Production" mtBase="16" mtMd="8">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["goals", "assists", "points"]}
                    title="Goals, Assists, and Points"
                    allSeasonsStats={playerStats}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shots"]}
                        title="Shots"
                        allSeasonsStats={playerStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shotPct"]}
                        title="Shot Percentage"
                        allSeasonsStats={playerStats}
                    />
                </Subsection>
            </Section>

            <Section title="Health and Utilization">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["games"]}
                    title="Games Played"
                    allSeasonsStats={playerStats}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["timeOnIcePerGame"]}
                        title="Average Time On Ice Per Game"
                        allSeasonsStats={playerStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["timeOnIce"]}
                        title="Total Time on Ice per Season"
                        allSeasonsStats={playerStats}
                    />
                </Subsection>
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["evenTimeOnIcePerGame"]}
                        title="Average Even Strength Time On Ice Per Game"
                        allSeasonsStats={playerStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["evenTimeOnIce"]}
                        title="Even Strength Total Time on Ice per Season"
                        allSeasonsStats={playerStats}
                    />
                </Subsection>

                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shifts"]}
                    title="Shifts"
                    allSeasonsStats={playerStats}
                />
            </Section>

            <Section title="Physicality">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["hits"]}
                    title="Hits"
                    allSeasonsStats={playerStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["pim"]}
                    title="Penalty Minutes"
                    allSeasonsStats={playerStats}
                />
            </Section>

            <Section title="Special Units">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["powerPlayGoals", "powerPlayPoints"]}
                    title="Power Play (Production)"
                    allSeasonsStats={playerStats}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["powerPlayTimeOnIcePerGame"]}
                        title="Power Play (Average TOI per Game)"
                        allSeasonsStats={playerStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["powerPlayTimeOnIce"]}
                        title="Power Play (Total TOI per Season)"
                        allSeasonsStats={playerStats}
                    />
                </Subsection>

                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shortHandedGoals", "shortHandedPoints"]}
                    title="Penalty Kill"
                    allSeasonsStats={playerStats}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shortHandedTimeOnIcePerGame"]}
                        title="Penalty Kill (Average TOI per Game)"
                        allSeasonsStats={playerStats}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shortHandedTimeOnIce"]}
                        title="Penalty Kill (Total TOI per Season)"
                        allSeasonsStats={playerStats}
                    />
                </Subsection>
            </Section>

            <Section title="Clutch Factor">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["gameWinningGoals", "overTimeGoals"]}
                    title="Game Winning and Overtime Goals"
                    allSeasonsStats={playerStats}
                />
            </Section>

            <Section title="Defense">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["blocked"]}
                    title="Blocked Shots"
                    allSeasonsStats={playerStats}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["plusMinus"]}
                    title="Plus Minus"
                    allSeasonsStats={playerStats}
                />
            </Section>

            <Section title="Face-offs">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["faceOffPct"]}
                    title="Face-Off Percentage"
                    allSeasonsStats={playerStats}
                />
            </Section>
        </>
    );
};

export default TotalsGraphs;
