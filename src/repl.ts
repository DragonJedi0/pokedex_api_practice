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