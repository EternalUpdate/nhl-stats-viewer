import "./App.css";
import PlayerStatLineChart from "./components/PlayerStatLineChart";
import { Text, Heading, Box } from "@chakra-ui/react";
import { Section } from "./components/Section";

function App() {
    return (
        <>
            <Heading size="lg" fontWeight="semibold" pt={{ base: "1" }}>
                NHL Stat Viewer
            </Heading>
            <Text fontSize="lg" color="gray.500">
                See progress over time{" "}
            </Text>

            <Box
                className="player-info-container"
                m="1"
                pt={{ base: "12", md: "16" }}
                mb={{ md: "20" }}
            >
                <Text fontSize="2xl">Josh Anderson</Text>
                <Text fontSize="md" color="gray.500">
                    #17 MTL | 29 yrs | 6'3 | 218 lbs
                </Text>
            </Box>

            <Section title="Production">
                <PlayerStatLineChart
                    playerID={8476981}
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
                        playerID={8476981}
                        statTypes={["shots"]}
                        title="Shots"
                    />
                    <PlayerStatLineChart
                        playerID={8476981}
                        statTypes={["shotPct"]}
                        title="Shot Percentage"
                    />
                </Box>
            </Section>

            <Section title="Health and Utilization">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["games"]}
                    title="Games Played"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["evenTimeOnIce"]}
                    title="Even Strength Total Time on Ice per Season"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["shifts"]}
                    title="Shifts"
                />
            </Section>

            <Section title="Physicality">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["hits"]}
                    title="Hits"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["pim"]}
                    title="Penalty Minutes"
                />
            </Section>

            <Section title="Special Units">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["powerPlayGoals", "powerPlayPoints"]}
                    title="Power Play (Production)"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["powerPlayTimeOnIce"]}
                    title="Power Play (Total TOI per Season)"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["shortHandedGoals", "shortHandedPoints"]}
                    title="Penalty Kill"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["shortHandedTimeOnIce"]}
                    title="Penalty Kill (Total TOI per Season)"
                />
            </Section>

            <Section title="Clutch Factor">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["gameWinningGoals", "overtimeGoals"]}
                    title="Game Winning and Overtime Goals"
                />
            </Section>

            <Section title="Defense">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["blocked"]}
                    title="Blocked Shots"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["plusMinus"]}
                    title="Plus Minus"
                />
            </Section>

            <Section title="Face-offs">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["faceoffPct"]}
                    title="Face-Off Percentage"
                />
            </Section>
        </>
    );
}

export default App;
