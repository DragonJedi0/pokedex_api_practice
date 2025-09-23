import { createInterface } from "node:readline";

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
        const command = cleanInput(input);
        if (command.length === 0){
            rl.prompt();
            return;
        }

        console.log(`Your command was: ${command[0]}`);
        rl.prompt();
    });
}