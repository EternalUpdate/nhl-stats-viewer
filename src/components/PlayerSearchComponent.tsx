import {
    Input,
    FormControl,
    Box,
    Text,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { searchLeagueForPlayer } from "../utils/nhl-api-helpers";
import { Search2Icon } from "@chakra-ui/icons";
import { PlayerInfo } from "../types/PlayerInfo";
import "../App.css";

const PlayerSearchComponent = ({ onPlayerSearch }: any) => {
    const [searchText, setSearchText] = useState<string>("");
    const [foundPlayers, setFoundPlayers] = useState<(PlayerInfo | null)[]>([]);

    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
        <div>
            <FormControl mx="auto" mb="14" w={{ base: "64", md: "30%" }}>
                <InputGroup>
                    <Input
                        type="text"
                        value={searchText}
                        onChange={handleInputChange}
                        placeholder="Enter player name"
                        w={{ base: "64", md: "100%" }}
                    />
                    <InputRightElement>
                        <Search2Icon />
                    </InputRightElement>
                </InputGroup>
                <Box
                    className={
                        foundPlayers.length > 0 && searchText !== ""
                            ? "fade-in-top"
                            : "fade-out"
                    }
                    mt="2"
                    p="2"
                    borderWidth="1px"
                    borderRadius="md"
                    style={
                        !(foundPlayers.length > 0 && searchText !== "")
                            ? { height: 0, overflow: "hidden" }
                            : {}
                    }
                >
                    {foundPlayers.map((player) => {
                        if (player) {
                            return (
                                <Text
                                    key={player.id}
                                    onClick={() =>
                                        handlePlayerSelect(player.id)
                                    }
                                    cursor="pointer"
                                    textDecoration="underline 0.15em rgba(255, 255, 255, 0)"
                                    transition="text-decoration-color 300ms"
                                    _hover={{
                                        textDecoration: "underline",
                                        textDecorationThickness: "3px",
                                        textDecorationColor: "#CBD5E0",
                                    }}
                                >
                                    {player.fullName} - #{player.primaryNumber}{" "}
                                    {player.currentTeam.abbreviation}
                                </Text>
                            );
                        }
                    })}
                </Box>
            </FormControl>
        </div>
    );
};

export default PlayerSearchComponent;
