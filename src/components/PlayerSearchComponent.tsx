import { Input, FormControl, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { searchLeagueForPlayer } from "../utils/nhl-api-helpers";
import { Search2Icon } from "@chakra-ui/icons";

const PlayerSearchComponent = ({ onPlayerSearch }: any) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault(); // Prevent form submission refresh
        const foundPlayers = await searchLeagueForPlayer(searchText);
        const firstPlayerID = foundPlayers[0]?.id; // Get the ID of the first player

        if (firstPlayerID) {
            onPlayerSearch(firstPlayerID);
        } else {
            console.log(
                "PlayerSearchComponent — handleSubmit(): no player found"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            </FormControl>
        </form>
    );
};

export default PlayerSearchComponent;
