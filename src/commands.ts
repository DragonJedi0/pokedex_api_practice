import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

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
        // other commands
    };
}