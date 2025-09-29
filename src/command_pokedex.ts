import { State } from "./state";

export async function commandPokeDex(state: State): Promise<void>{
    try {
        const names = Object.keys(state.pokedex);
        if(names.length === 0) throw new Error("Pokedex is empty. :/ Go catch'em!\nUse `catch <pokemon_name>`");
        console.log("Your Pokedex:");
        for (const name of names){
            const c = state.pokecount[name];
            console.log(c === 1 ? ` - ${name}` : ` - ${name} (${c})`);
        }
    } catch (err) {
        const e = err as Error;
        console.log(`${e.message}`);
    }
}
