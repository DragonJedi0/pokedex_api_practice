import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInpect } from "./command_inpect.js";
import { commandMapForward } from "./command_map.js";
import { commandMapBack } from "./command_map.js";
import { commandPokeDex } from "./command_pokedex.js";

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
        explore: {
            name: "explore",
            description: "Shows a list of possible Pokemon in selected Area.\n         Usage: explore <area_name>",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch Pokemon\n       Usage: catch `pokemon_name`",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Describe aspects of Pokemon",
            callback: commandInpect,
        },
        pokedex: {
            name: "pokedex",
            description: "List pokemon caught",
            callback: commandPokeDex,
        },
        // other commands
    };
}