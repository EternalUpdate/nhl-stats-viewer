import "./App.css";
import PlayerStatLineChart from "./components/PlayerStatLineChart";
import { Text, Heading, Box } from "@chakra-ui/react";

function App() {
    return (
        <>
            <Heading size="lg" fontWeight="semibold" pt={{ base: "1" }}>
                NHL Stat Viewer
            </Heading>
            <Box
                m="1"
                pt={{ base: "12", md: "14" }}
                pb={{ base: "12", md: "14" }}
            >
                <Text fontSize="2xl">Josh Anderson</Text>
                <Text fontSize="md" color="gray.500">
                    #17 MTL | 29 yrs | 6'3 | 218 lbs
                </Text>
            </Box>
            <Text fontSize={{ base: "2xl", md: "3xl" }} textAlign="left">
                Production
            </Text>
            <PlayerStatLineChart
                playerID={8476981}
                statTypes={["goals", "assists", "points"]}
                title="Goals, Assists, and Points"
            />
            <PlayerStatLineChart
                playerID={8476981}
                statTypes={["games"]}
                title="Games Played"
            />
        </>
    );
}

export default App;
