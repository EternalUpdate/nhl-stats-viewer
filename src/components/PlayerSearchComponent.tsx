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
            <FormControl mx="auto" mb="14" w={{ base: "300px", md: "350px" }}>
                <div className="player-search-input-div">
                    <InputGroup zIndex={"2"}>
                        <Input
                            className="player-search-input"
                            type="text"
                            size="lg"
                            {...getInputProps()}
                            value={searchText}
                            onChange={handleInputChange}
                            placeholder="Enter player name"
                            w={{ base: "300px", md: "100%" }}
                            bgColor={"white"}
                        />
                        <InputRightElement height={"100%"} fontSize="lg">
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
                        bgColor={"white"}
                        zIndex={"2"}
                        position="relative"
                        // maxH="400px"
                        // overflowY="scroll"
                        style={
                            !(foundPlayers.length > 0 && searchText !== "")
                                ? { height: 0, overflow: "hidden" }
                                : {}
                        }
                        {...getMenuProps()}
                    >
                        {foundPlayers.map((player, index) => (
                            <Box
                                key={player?.id}
                                {...getItemProps({
                                    index,
                                    item: player,
                                    style: {
                                        display: "flex",
                                        fontSize: "18px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "6px 24px",
                                        gap: "10px",
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
                                <Text textAlign="left">{player?.fullName}</Text>
                                <Text color="gray.500" fontSize="xs">
                                    #{player?.primaryNumber}{" "}
                                    {player?.currentTeam?.abbreviation}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                )}
                {/* End of the autocomplete stuff */}
            </FormControl>
        </div>
    );
};

export default PlayerSearchComponent;
