import {
    Input,
    FormControl,
    Box,
    Text,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { searchLeagueForPlayer } from "../utils/nhl-api-helpers";
import { Search2Icon } from "@chakra-ui/icons";
import { PlayerInfo } from "../types/PlayerInfo";
import "../App.css";
import { useCombobox } from "downshift"; // autocomplete goodness

const PlayerSearchComponent = ({ onPlayerSearch }: any) => {
    const [searchText, setSearchText] = useState("");
    const [foundPlayers, setFoundPlayers] = useState<(PlayerInfo | null)[]>([]);

    /**
     * Handles the input change event in the search input box.
     * Updates the search text state and retrieves matching players.
     */
    const handleInputChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const inputValue = event.target.value;
        setSearchText(inputValue);
        const players = await searchLeagueForPlayer(inputValue);
        setFoundPlayers(players);
    };

    /**
     * Handles the selection of a player from the dropdown menu.
     * Executes the player search callback, clears the search text and found players,
     * and closes the dropdown menu.
     * @param playerID - The ID of the selected player.
     */
    const handlePlayerSelect = (playerID: number) => {
        onPlayerSearch(playerID);
        setSearchText("");
        setFoundPlayers([]);
        toggleMenu();
    };

    /**
     * Uses the useCombobox hook from the Downshift library to manage the behavior of the search input and the auto-suggestion dropdown menu.
     */
    const {
        isOpen,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        toggleMenu,
    } = useCombobox({
        items: foundPlayers,
        onInputValueChange: ({ inputValue }) => setSearchText(inputValue || ""),
        itemToString: (player) => (player ? player.fullName : ""),
        onSelectedItemChange: ({ selectedItem }) => {
            if (selectedItem) {
                handlePlayerSelect(selectedItem.id);
            }
        },
    });

    useEffect(() => {
        if (!isOpen) {
            setSearchText(""); // Clear the search text when the dropdown menu is closed
        }
    }, [isOpen]);

    return (
        <div>
            <FormControl mx="auto" mb="14" w={{ base: "64", md: "30%" }}>
                <div>
                    <InputGroup>
                        <Input
                            type="text"
                            {...getInputProps()}
                            value={searchText}
                            onChange={handleInputChange}
                            placeholder="Enter player name"
                            w={{ base: "64", md: "100%" }}
                        />
                        <InputRightElement>
                            <Search2Icon />
                        </InputRightElement>
                    </InputGroup>
                </div>
                {/* The autocomplete stuff */}
                {isOpen && (
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
                        {...getMenuProps()}
                    >
                        {foundPlayers.map((player, index) => (
                            <Text
                                key={player?.id}
                                {...getItemProps({
                                    index,
                                    item: player,
                                    style: {
                                        backgroundColor:
                                            highlightedIndex === index
                                                ? "#EDF2F7"
                                                : "transparent",
                                        cursor: "pointer",
                                        borderRadius: "5px",
                                        transition:
                                            "background-color 150ms linear",
                                    },
                                })}
                            >
                                {player?.fullName} - #{player?.primaryNumber}{" "}
                                {player?.currentTeam?.abbreviation}
                            </Text>
                        ))}
                    </Box>
                )}
                {/* End of the autocomplete stuff */}
            </FormControl>
        </div>
    );
};

export default PlayerSearchComponent;
