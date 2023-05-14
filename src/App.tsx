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
            </Section>

            <Section title="Health">
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["games"]}
                    title="Games Played"
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
                    title="Power Play"
                />
                <PlayerStatLineChart
                    playerID={8476981}
                    statTypes={["shortHandedGoals", "shortHandedPoints"]}
                    title="Penalty Kill"
                />
            </Section>
        </>
    );
}

export default App;
