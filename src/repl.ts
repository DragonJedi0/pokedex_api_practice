import type { State } from "./state.js";

export function cleanInput(val: string): string[]{
    if(!val) return [];
    return val.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

export function startREPL(state: State) {
    state.readline.on('line', async (input) => {
        const words = cleanInput(input);
        if (words.length === 0){
            state.readline.prompt();
            return;
        }

        const [cmd, ...args] = words;
        const command = state.commands[cmd];

        if (!command){
            console.log(`Unknown command: "${cmd}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }
        try {
            await command.callback(state, ...args);
        } catch (err) {
            const e = err as Error
            console.log(e.message);
        }

        state.readline.prompt();
    });
}
