import { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL){
        console.log("You're on the first page.");
        return;
    }

    try{
        const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
        for (const location of locations.results){
            console.log(`${location.name}`)
        }
        state.nextLocationsURL = locations.next
        state.prevLocationsURL = locations.previous;
    } catch (err) {
        const e = err as Error;
        console.log(`${e.message}`);
    }
    
}
