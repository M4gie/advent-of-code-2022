const input = process.argv[2];

const [crates, moves] = input.split('\n\n');

const movesArray = moves.split('\n');
const instructions = movesArray.map((instruction) => {
  const [, amount, from, to] = instruction.match(/move (\d+) from (\d+) to (\d+)/)!;
  return { amount: Number(amount), from: Number(from), to: Number(to) };
});

const cratesLines = crates.split('\n');
cratesLines.pop();
const stacks: string[][] = [];
cratesLines.forEach((crateLine) => {
  const matches = crateLine.match(/[A-Z]|[\s]{4}/g)!;
  matches.forEach((match, i) => {
    const crateName = match.trim();
    if (crateName) {
      if (stacks[i]) {
        stacks[i].push(crateName);
      } else {
        stacks[i] = [crateName];
      }
    }
  });
});

instructions.forEach(({ amount, from, to }) => {
  for (let i = 0; i < amount; i++) {
    const movedCrate = stacks[from - 1].shift()!;
    stacks[to - 1].unshift(movedCrate);
  }
});

const result = stacks.map((stack) => stack[0]).join('');

console.log(result);
