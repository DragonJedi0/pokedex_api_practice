import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    state.pokeAPI.fetchLocations("something");
}