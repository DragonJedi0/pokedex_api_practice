import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { initState } from "./state.js";

export function cleanInput(val: string): string[]{
    let words: string[] = [];
    const input = val.toLowerCase().trim().split(" ");
    for (const i in input) {
        if (input[i] != '') {
            words.push(input[i]);
        }
    }
    return words;
}

export function startREPL() {
    const state = initState();
    state.readline.on('line', (input) => {
        const words = cleanInput(input);
        const cmd = words[0];
        if (words.length === 0){
            state.readline.prompt();
            return;
        }

        const command = state.commands[cmd];

        if (!command){
            console.log(`Unknown command: "${cmd}". Type "help" for a list of commands.`);
            state.readline.prompt();
            return;
        }
        try {
            command.callback(state);
        } catch (err) {
            const e = err as Error
            console.log(e.message);
        }

        state.readline.prompt();
    });
}
