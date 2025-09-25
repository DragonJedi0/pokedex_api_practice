import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    prevLocationsURL: string,
    nextLocationsURL: string,
}

export function initState(): State{
    const state = {
        readline: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: getCommands(),
        pokeAPI: new PokeAPI(),
        prevLocationsURL: "",
        nextLocationsURL: "",
    }

    state.readline.prompt(true); // preserveCursor = true

    return state;
}