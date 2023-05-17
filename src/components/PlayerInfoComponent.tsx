import { Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPlayerInfo } from "../utils/nhl-api-helpers";

const PlayerInfoComponent = ({ playerID }: { playerID: number }) => {
    const [name, setName] = useState<string>("A hockey player");
    const [jerseyNumber, setJerseyNumber] = useState<number>(1);
    const [teamAbbr, setTeamAbbr] = useState<string>("TEAM");
    const [age, setAge] = useState<number>(100);
    const [height, setHeight] = useState<string>("4'2");
    const [weight, setWeight] = useState<number>(200);
    const [position, setPosition] = useState<string>("C");

    useEffect(() => {
        const fetchPlayerInfo = async () => {
            try {
                const playerInfo = await getPlayerInfo(playerID);
                if (playerInfo) {
                    setName(`${playerInfo.firstName} ${playerInfo.lastName}`);
                    setJerseyNumber(playerInfo.primaryNumber);
                    setTeamAbbr(playerInfo.currentTeam.abbreviation);
                    setAge(playerInfo.currentAge);
                    setHeight(playerInfo.height);
                    setWeight(playerInfo.weight);
                    setPosition(playerInfo.primaryPosition.abbreviation);
                }
            } catch (error) {
                console.log("Error fetching player info: ", error);
            }
        };

        fetchPlayerInfo();
    }, [playerID]);

    return (
        <>
            <Box
                className="player-info-container"
                m="1"
                pt={{ base: "12", md: "16" }}
                mb={{ md: "-10" }}
            >
                <Text fontSize="2xl">{name}</Text>
                <Text fontSize="md" color="gray.500">
                    #{jerseyNumber} {teamAbbr} | {age} yrs | {height} | {weight}{" "}
                    lbs | {position}
                </Text>
            </Box>
        </>
    );
};

export default PlayerInfoComponent;
