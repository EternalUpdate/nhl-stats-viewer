import "../App.css";
import PlayerStatLineChart from "../components/PlayerStatLineChart";
import {
    Text,
    Heading,
    Link,
    Switch,
    VStack,
    FormControl,
    FormLabel,
    Box,
} from "@chakra-ui/react";
import { Section } from "../components/Section";
import { Subsection } from "../components/Subsection";
import PlayerSearchComponent from "../components/PlayerSearchComponent";
import PlayerInfoComponent from "../components/PlayerInfoComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
    getAllSeasonsPlayerStats,
    getPlayerInfo,
} from "../utils/nhl-api-helpers";
import { PlayerSeasonStats } from "../types/PlayerSeasonStats";

// test
// import "../utils/nhl-api-helpers";

const PlayerSeasonGraphsPage = () => {
    // sort out playerID
    const navigate = useNavigate();
    const URLPlayerID = useParams().playerID; // Get the player ID from the URL (if applicable)

    let defaultPlayerID: number;

    if (URLPlayerID) {
        defaultPlayerID = parseInt(URLPlayerID);
    } else {
        defaultPlayerID = 8476981;
    }

    // states
    const [playerID, setPlayerID] = useState<number>(defaultPlayerID);
    const [playoffs, setPlayoffs] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState<string | undefined>(undefined);
    const [playerStats, setPlayerStats] = useState<PlayerSeasonStats[]>([]); // array of player season stats array (one object for each season)

    useEffect(() => {
        // Get the player's name
        getPlayerInfo(playerID).then((playerInfo) => {
            setPlayerName(playerInfo?.fullName);
        });
    }, [playerID]);

    // sort out page title
    const pageTitle = playerName
        ? `${playerName} | NHL Stats Viewer`
        : "Waiting...";

    // component handlers
    const handlePlayerSearch = async (playerID: number) => {
        if (playerID) {
            // Update the URL with the selected player ID
            navigate(`/player/${playerID}`);
            setPlayerID(playerID); // Update the player ID with the ID of the first found player
        }
    };

    const handlePlayoffsToggle = () => {
        setPlayoffs((prevState) => !prevState);
    };

    useEffect(() => {
        // fetch the player stats once so it can feed all the line charts
        getAllSeasonsPlayerStats(playerID, playoffs).then((playerStats) => {
            setPlayerStats(playerStats);
        });
    }, [playerID, playoffs]);

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <Box padding={"3rem"} className="player-stats-page">
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
                    <PlayerInfoComponent
                        playerID={playerID}
                    ></PlayerInfoComponent>
                    <FormControl
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Switch
                            id="playoffs-toggle"
                            onChange={handlePlayoffsToggle}
                        />
                        <FormLabel
                            htmlFor="playoffs-toggle-label"
                            mb="0"
                            ml="2"
                        >
                            Playoffs
                        </FormLabel>
                    </FormControl>
                </VStack>

                <Section title="Production">
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
                <Text fontSize="sm" mt="28" color="gray.500">
                    Brought to you by{" "}
                    <Link
                        href="https://github.com/EternalUpdate/nhl-stats-viewer/tree/main"
                        target="_blank"
                    >
                        EternalUpdate
                    </Link>
                </Text>
            </Box>
        </>
    );
};

export default PlayerSeasonGraphsPage;
