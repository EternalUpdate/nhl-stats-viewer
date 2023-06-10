import PlayerSearchComponent from "../components/PlayerSearchComponent";
import { useNavigate } from "react-router-dom";
import { Heading, Text, Flex, Box, Link } from "@chakra-ui/react";
import styles from "./Home.module.css";

const Home = () => {
    const navigate = useNavigate();
    const handlePlayerSearch = async (playerID: number) => {
        if (playerID) {
            navigate(`/player/${playerID}`);
        }
    };

    return (
        <>
            <Flex
                direction={"column"}
                height={"100vh"}
                width={"100%"}
                paddingY={"2em"}
            >
                <Flex className={styles.homeHeaderContainer}>
                    <Flex
                        width={"100%"}
                        justifyContent={"space-between"}
                        alignItems={"baseline"}
                    >
                        <Text className={styles.homeTitle}>
                            NHL Stats Viewer
                        </Text>
                        <Text className={styles.credits}>
                            Brought to you by{" "}
                            <Link
                                href="https://github.com/EternalUpdate/nhl-stats-viewer/tree/main"
                                target="_blank"
                            >
                                EternalUpdate
                            </Link>
                        </Text>
                    </Flex>
                    <Text className={styles.homeSubtitle}>
                        See progress over time{" "}
                    </Text>
                </Flex>
                <Box className={styles.homeHeroContainer}>
                    <Heading className={styles.homeHeroTitle}>
                        Look up current NHL player stats{" "}
                        <Text className={styles.homeHeroEmphasis}>
                            visually.
                        </Text>
                    </Heading>
                    <Box>
                        <PlayerSearchComponent
                            onPlayerSearch={handlePlayerSearch}
                        />
                    </Box>
                </Box>
                <Box className={styles.waveSvgBox}>
                    <div className={styles.waveDivider}>
                        <svg
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                                className={styles.shapeFill}
                            ></path>
                        </svg>
                        <Box className={styles.waveSvgBottomFill}></Box>
                    </div>
                </Box>
            </Flex>
        </>
    );
};

export default Home;
