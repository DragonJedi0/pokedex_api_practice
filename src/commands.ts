import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_map.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays list of commands",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Displays next list of areas in PokeAPI",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Displays previous list of areas in PokeAPI",
            callback: commandMapBack,
        },
        // other commands
    };
}