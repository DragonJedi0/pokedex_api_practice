import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    try{
        const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
        for (const location of locations.results){
            console.log(`${location.name}`)
        }
        state.nextLocationsURL = locations.next
        state.prevLocationsURL = locations.previous;
    } catch (err) {
        const e = err as Error;
        throw new Error(`Error fetching locations ${e.message}`);
    }
    
}