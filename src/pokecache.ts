export type CacheEntry<T> = {
    createdAt: number,
    value: T,
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(number: number){
        this.#interval = number;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T){
        const cacheData: CacheEntry<T> = {
            createdAt: Date.now(),
            value: val,
        }
        this.#cache.set(key, cacheData);
    }

    get<T>(key: string){
        if(this.#cache.has(key)){
            return this.#cache.get(key)?.value;
        }
        return undefined;
    }

    #reap(){
        this.#cache.forEach(
            (value, key) => {
                if(value.createdAt < Date.now() - this.#interval){
                    this.#cache.delete(key);
                }
            }
        );
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => { this.#reap() }, this.#interval);
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
