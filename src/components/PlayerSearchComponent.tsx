import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { searchLeagueForPlayer } from "../utils/nhl-api-helpers";

const PlayerSearchComponent = ({ onPlayerSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = async (event) => {
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
            <Input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Enter player name"
                w="30%"
                mb="14"
            />
            <Button type="submit">Search</Button>
        </form>
    );
};

export default PlayerSearchComponent;
