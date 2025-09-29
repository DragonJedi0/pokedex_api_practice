import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void>{
    try{
        if (args.length === 0){
            throw new Error("No pokemon given to try to catch");
        }
        const name = args.length > 1 ? args.join("-") : args[0];
        const pokemon = await state.pokeAPI.fetchPokemon(name);
        console.log(`Throwing a Pokeball at ${name}...`);
        if(Math.random() + state.playerExp >= pokemon.base_experience){
            console.log(`${name} was caught!`);
            state.pokedex[pokemon.name] = pokemon;
        } else {
            console.log(`${name} escaped!`);
            state.playerExp += 12;
        }
    } catch (err) {
        const e = err as Error;
        console.log(`${e.message}\nUsage: \`catch <pokemon_name>\``);
    }
}
