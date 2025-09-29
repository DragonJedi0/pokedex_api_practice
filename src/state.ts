import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";
import { stringify } from "querystring";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
    pokedex: Record<string, Pokemon>,
    pokecount: Record<string, number>,
    playerExp: number,
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
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: {},
        pokecount: {},
        playerExp: 50,
    }

    state.readline.prompt(true); // preserveCursor = true

    return state;
}