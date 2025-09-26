import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache = new Cache(30000);

    constructor() {}

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        // Determine which URL to use
        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        // Check if cached.
        const isCached = this.cache.get(url);
        if(isCached){
            //console.log("Using Cache");
            return isCached;
        }
        //console.log("Using Fetch");

        try {
            // Make the fetch request (await the promise)
            const response = await fetch(url);

            // Check if the response is ok (status 200-299)
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parse the JSON (await this too)
            const data = await response.json();

            // Add to cache
            this.cache.add(url, data as ShallowLocations);

            // Return the data (automatically wrapped in a Promise because of 'async')
            return data as ShallowLocations;

        } catch (err){
            // Handle both network errors and parsing errors
            const error = err as Error; // prevents `any` type compilation errors
            throw new Error(`Failed to fetch locations: ${error.message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const isCached = this.cache.get(url);

        if(isCached){
            return isCached;
        }

        try {
            const response = await fetch(url);
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.add(url, data as Location);
            return data as Location;
        } catch (err) {
            const error = err as Error;
            throw new Error(`Failed to fetch location: ${error.message}`);
        }
    }
}

export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        name: string,
        url: string,
    }[],
};

export type Location = {
    id: number,
    name: string,
    game_index: number,
    encounter_method_rates: {
        encounter_method: {
            name: string,
            url: string,
        },
        version_details: {
            rate: number,
            version: {
                name: string,
                url: string,
            }
        }[],
    }[],
    location: {
        name: string,
        url: string,
    },
    names: {
        name: string,
        language: {
            name: string,
            url: string,
        }
    }[],
    pokemon_encounters: {
        pokemon: {
            name: string,
            url: string,
        },
        version_details: {
            version: {
                name: string,
                url: string,
            },
            max_chance: number,
            encounter_details: {
                min_level: number,
                max_level: number,
                condition_values: string[],
                chance: number,
                method: {
                    name: string,
                    url: string,
                }
            }[],
        }[],
    }[],
};
