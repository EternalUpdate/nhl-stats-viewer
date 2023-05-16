import {
    Input,
    FormControl,
    HStack,
    IconButton,
    Box,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchLeagueForPlayer } from "../utils/nhl-api-helpers";
import { Search2Icon } from "@chakra-ui/icons";

const PlayerSearchComponent = ({ onPlayerSearch }: any) => {
    const [searchText, setSearchText] = useState<string>("");
    const [foundPlayers, setFoundPlayers] = useState<any[]>([]);

    const handleInputChange = async (event: any) => {
        const inputValue = event.target.value;
        setSearchText(inputValue);
        const players = await searchLeagueForPlayer(inputValue);
        setFoundPlayers(players);
    };

    const handlePlayerSelect = (playerID: number) => {
        onPlayerSearch(playerID);
        setSearchText("");
        setFoundPlayers([]);
    };

    return (
        <FormControl mb="14">
            <HStack justifyContent="center">
                <Input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    placeholder="Enter player name"
                    w={{ base: "64", md: "30%" }}
                />
                <IconButton
                    aria-label="search"
                    icon={<Search2Icon />}
                    type="submit"
                ></IconButton>
            </HStack>
            {foundPlayers.length > 0 && (
                <Box mt="2" p="2" borderWidth="1px" borderRadius="md">
                    {foundPlayers.map((player) => (
                        <Text
                            key={player.id}
                            onClick={() => handlePlayerSelect(player.id)}
                            cursor="pointer"
                        >
                            {player.fullName} - #{player.primaryNumber}{" "}
                            {player.currentTeam.abbreviation}
                        </Text>
                    ))}
                </Box>
            )}
        </FormControl>
    );
};

export default PlayerSearchComponent;
