import { State } from "./state.js";

export async function commandInpect(state: State, ...args: string[]): Promise<void>{
    try {
        if (args.length === 0){
            throw new Error("No pokemon detected");
        }
        const name = args.length > 1 ? args.join("-") : args[0];
        if(!state.pokedex[name]){
            console.log("You have not caught that pokemon");
            throw new Error(`You can inspect after you've caught ${name}`);
        }
        const pokemon = state.pokedex[name];
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log(`Stats:`);
        for (const stat of pokemon.stats){
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log(`Types:`);
        for (const typeInfo of pokemon.types){
            console.log(` - ${typeInfo.type.name}`);
        }
        console.log();
    } catch (err) {
        const e = err as Error;
        console.log(`${e.message}\nUsage: \`inspect <pokemon_name>\``);
    }
}
