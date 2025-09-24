import { createInterface } from "node:readline";
import { getCommands } from "./command.js";

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
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt(true); // preserveCursor = true
    rl.on('line', (input) => {
        const words = cleanInput(input);
        const command = words[0];
        if (words.length === 0){
            rl.prompt();
            return;
        }

        try {
            const commands = getCommands();
            if (command in commands){
                commands[command].callback(commands);
            } else {
                console.log(`Unknown command: "${command}". Type "help" for a list of commands.`);
                rl.prompt();
                return;
            }
        } catch (err) {
            const e = err as Error
            console.log(e.message);
        }

        rl.prompt();
    });
}
