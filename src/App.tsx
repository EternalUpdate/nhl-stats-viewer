import "./App.css";
import PlayerStatLineChart from "./components/PlayerStatLineChart";
import { Text, Heading, Box, Link } from "@chakra-ui/react";
import { Section } from "./components/Section";
import PlayerSearchComponent from "./components/PlayerSearchComponent";
import PlayerInfoComponent from "./components/PlayerInfoComponent";
import { useState } from "react";

// test
// import "./utils/nhl-api-helpers";

function App() {
    const [playerID, setPlayerID] = useState(8476981); // Default player ID

    const handlePlayerSearch = async (playerID: number) => {
        if (playerID) {
            setPlayerID(playerID); // Update the player ID with the ID of the first found player
            console.log(playerID);
        }
    };

    return (
        <>
            <PlayerSearchComponent onPlayerSearch={handlePlayerSearch} />

            <Heading size="lg" fontWeight="semibold" pt={{ base: "1" }}>
                NHL Stats Viewer
            </Heading>
            <Text fontSize="lg" color="gray.500">
                See progress over time{" "}
            </Text>

            <PlayerInfoComponent playerID={playerID}></PlayerInfoComponent>

            <Section title="Production">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["goals", "assists", "points"]}
                    title="Goals, Assists, and Points"
                />
                <Box
                    display={{ base: "block", md: "flex" }}
                    flexGrow="1"
                    flexDirection="row"
                    flexWrap="wrap"
                    gap="70px"
                    justifyContent="space-evenly"
                    alignContent="center"
                >
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shots"]}
                        title="Shots"
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shotPct"]}
                        title="Shot Percentage"
                    />
                </Box>
            </Section>

            <Section title="Health and Utilization">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["games"]}
                    title="Games Played"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["evenTimeOnIce"]}
                    title="Even Strength Total Time on Ice per Season"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shifts"]}
                    title="Shifts"
                />
            </Section>

            <Section title="Physicality">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["hits"]}
                    title="Hits"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["pim"]}
                    title="Penalty Minutes"
                />
            </Section>

            <Section title="Special Units">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["powerPlayGoals", "powerPlayPoints"]}
                    title="Power Play (Production)"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["powerPlayTimeOnIce"]}
                    title="Power Play (Total TOI per Season)"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shortHandedGoals", "shortHandedPoints"]}
                    title="Penalty Kill"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shortHandedTimeOnIce"]}
                    title="Penalty Kill (Total TOI per Season)"
                />
            </Section>

            <Section title="Clutch Factor">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["gameWinningGoals", "overTimeGoals"]}
                    title="Game Winning and Overtime Goals"
                />
            </Section>

            <Section title="Defense">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["blocked"]}
                    title="Blocked Shots"
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["plusMinus"]}
                    title="Plus Minus"
                />
            </Section>

            <Section title="Face-offs">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["faceOffPct"]}
                    title="Face-Off Percentage"
                />
            </Section>
            <Text fontSize="sm" mt="28" color="gray.500">
                Brought to you by{" "}
                <Link
                    href="https://github.com/EternalUpdate/nhl-stats-viewer/tree/main"
                    target="_blank"
                >
                    EternalUpdate
                </Link>
            </Text>
        </>
    );
}

export default App;
