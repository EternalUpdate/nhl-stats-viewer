import PlayerSearchComponent from "../components/PlayerSearchComponent";
import { useNavigate } from "react-router-dom";
import { Heading, Text, Flex, Box } from "@chakra-ui/react";
import "./Home.css";

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
                <Flex className="home-header-container">
                    <Heading
                        className="home-title"
                        fontSize={"1.2rem"}
                        fontWeight={600}
                        color={"gray.700"}
                    >
                        NHL Stats Viewer
                    </Heading>
                    <Text className="home-subtitle">
                        See progress over time{" "}
                    </Text>
                </Flex>
                <Box className="home-hero-container">
                    <Heading className="home-hero-title">
                        Look up current NHL player stats{" "}
                        <Text className="home-hero-emphasis">visually.</Text>
                    </Heading>
                    <Box>
                        <PlayerSearchComponent
                            onPlayerSearch={handlePlayerSearch}
                        />
                    </Box>
                </Box>
                <Box>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        className="home-wave-svg"
                    >
                        <path
                            fill="#f3f4f5"
                            fill-opacity="1"
                            d="M0,192L40,181.3C80,171,160,149,240,144C320,139,400,149,480,176C560,203,640,245,720,229.3C800,213,880,139,960,117.3C1040,96,1120,128,1200,128C1280,128,1360,96,1400,80L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
                        ></path>
                    </svg>
                    <Box className="home-wave-continuation-fill"></Box>
                </Box>
            </Flex>
        </>
    );
};

export default Home;
