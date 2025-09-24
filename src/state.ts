import { createInterface, type Interface } from "readline";
import { cleanInput } from "./repl.js";
import { getCommands } from "./commands.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State{
    const state = {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
    }

    state.readline.prompt(true); // preserveCursor = true

    return state;
}