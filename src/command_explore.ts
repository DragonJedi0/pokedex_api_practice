import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void>{
    try{
        if (args.length === 0){
            throw new Error("No area given to explore");
        }
        const name = args.length > 1 ? args.join("-") : args[0];
        console.log(`Exploring ${name}...`);
        const locationInfo = await state.pokeAPI.fetchLocation(name);
        const pokemonList = locationInfo.pokemon_encounters;
        console.log("Found Pokemon:");
        for (const pokemonInfo of pokemonList){
            console.log(` - ${pokemonInfo.pokemon.name}`);
        }
    } catch (err) {
        const e = err as Error;
        console.log(`${e.message}\nUsage: \`explore <area_name>\``);
    }
}
