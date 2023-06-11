import "../App.css";
import {
    Text,
    Heading,
    Link,
    Switch,
    VStack,
    FormControl,
    FormLabel,
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
} from "@chakra-ui/react";
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
import TotalsGraphs from "../components/TotalsGraphs";
import PerGameGraphs from "../components/PerGameGraphs";
import ProjectedGraphs from "../components/ProjectedGraphs";

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

            <Box padding={"2rem 3rem"} className="player-stats-page">
                <Flex
                    direction={"row"}
                    mb="8"
                    justify={{ base: "center", md: "flex-start" }}
                >
                    <Flex
                        direction={"column"}
                        align={"center"}
                        justify={"center"}
                    >
                        <Link href="/">
                            <Heading as="h1" fontSize="lg" color="gray.600">
                                NHL Stats Viewer
                            </Heading>
                        </Link>

                        <Text fontSize="sm" color="gray.500">
                            See progress over time{" "}
                        </Text>
                    </Flex>
                </Flex>
                <PlayerSearchComponent onPlayerSearch={handlePlayerSearch} />

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
                        <VStack>
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
                        </VStack>
                    </FormControl>
                    <Tabs
                        variant="soft-rounded"
                        colorScheme="blue"
                        align="center"
                        defaultIndex={0}
                        isLazy
                    >
                        <TabList>
                            <Tab>Totals</Tab>
                            <Tab>Per Game</Tab>
                            <Tab>Projected Over 82 Games</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <TotalsGraphs
                                    playerID={playerID}
                                    playerStats={playerStats}
                                />
                            </TabPanel>
                            <TabPanel>
                                <PerGameGraphs
                                    playerID={playerID}
                                    playerStats={playerStats}
                                />
                            </TabPanel>
                            <TabPanel>
                                <ProjectedGraphs
                                    playerID={playerID}
                                    playerStats={playerStats}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>

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
