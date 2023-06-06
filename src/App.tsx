import "./App.css";
import PlayerStatLineChart from "./components/PlayerStatLineChart";
import {
    Text,
    Heading,
    Link,
    Switch,
    VStack,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import { Section } from "./components/Section";
import { Subsection } from "./components/Subsection";
import PlayerSearchComponent from "./components/PlayerSearchComponent";
import PlayerInfoComponent from "./components/PlayerInfoComponent";
import { useState } from "react";

// test
import "./utils/nhl-api-helpers";
import "./utils/time-helpers";

function App() {
    const [playerID, setPlayerID] = useState<number>(8476981);
    const [playoffs, setPlayoffs] = useState<boolean>(false);

    const handlePlayerSearch = async (playerID: number) => {
        if (playerID) {
            setPlayerID(playerID); // Update the player ID with the ID of the first found player
            console.log(playerID);
        }
    };

    const handlePlayoffsToggle = () => {
        if (playoffs) {
            setPlayoffs(false);
        } else {
            setPlayoffs(true);
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

            <VStack
                spacing={{ base: "8", md: "20" }}
                mb={{ base: "0", md: "-8" }}
            >
                <PlayerInfoComponent playerID={playerID}></PlayerInfoComponent>
                <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Switch
                        id="playoffs-toggle"
                        onChange={handlePlayoffsToggle}
                    />
                    <FormLabel htmlFor="playoffs-toggle-label" mb="0" ml="2">
                        Playoffs
                    </FormLabel>
                </FormControl>
            </VStack>

            <Section title="Production">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["goals", "assists", "points"]}
                    title="Goals, Assists, and Points"
                    playoffs={playoffs}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shots"]}
                        title="Shots"
                        playoffs={playoffs}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shotPct"]}
                        title="Shot Percentage"
                        playoffs={playoffs}
                    />
                </Subsection>
            </Section>

            <Section title="Health and Utilization">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["games"]}
                    title="Games Played"
                    playoffs={playoffs}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["timeOnIcePerGame"]}
                        title="Average Time On Ice Per Game"
                        playoffs={playoffs}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["timeOnIce"]}
                        title="Total Time on Ice per Season"
                        playoffs={playoffs}
                    />
                </Subsection>
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["evenTimeOnIcePerGame"]}
                        title="Average Even Strength Time On Ice Per Game"
                        playoffs={playoffs}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["evenTimeOnIce"]}
                        title="Even Strength Total Time on Ice per Season"
                        playoffs={playoffs}
                    />
                </Subsection>

                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shifts"]}
                    title="Shifts"
                    playoffs={playoffs}
                />
            </Section>

            <Section title="Physicality">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["hits"]}
                    title="Hits"
                    playoffs={playoffs}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["pim"]}
                    title="Penalty Minutes"
                    playoffs={playoffs}
                />
            </Section>

            <Section title="Special Units">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["powerPlayGoals", "powerPlayPoints"]}
                    title="Power Play (Production)"
                    playoffs={playoffs}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["powerPlayTimeOnIcePerGame"]}
                        title="Power Play (Average TOI per Game)"
                        playoffs={playoffs}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["powerPlayTimeOnIce"]}
                        title="Power Play (Total TOI per Season)"
                        playoffs={playoffs}
                    />
                </Subsection>

                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["shortHandedGoals", "shortHandedPoints"]}
                    title="Penalty Kill"
                    playoffs={playoffs}
                />
                <Subsection>
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shortHandedTimeOnIcePerGame"]}
                        title="Penalty Kill (Average TOI per Game)"
                        playoffs={playoffs}
                    />
                    <PlayerStatLineChart
                        playerID={playerID}
                        statTypes={["shortHandedTimeOnIce"]}
                        title="Penalty Kill (Total TOI per Season)"
                        playoffs={playoffs}
                    />
                </Subsection>
            </Section>

            <Section title="Clutch Factor">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["gameWinningGoals", "overTimeGoals"]}
                    title="Game Winning and Overtime Goals"
                    playoffs={playoffs}
                />
            </Section>

            <Section title="Defense">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["blocked"]}
                    title="Blocked Shots"
                    playoffs={playoffs}
                />
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["plusMinus"]}
                    title="Plus Minus"
                    playoffs={playoffs}
                />
            </Section>

            <Section title="Face-offs">
                <PlayerStatLineChart
                    playerID={playerID}
                    statTypes={["faceOffPct"]}
                    title="Face-Off Percentage"
                    playoffs={playoffs}
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
