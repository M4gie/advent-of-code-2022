const input = process.argv[2];

const backpacks = input.split('\n');

let score = 0;

while (backpacks.length > 0) {
  const team = backpacks.splice(0, 3);
  const teamBadge = findCommonItem(team);
  score += itemScore(teamBadge);
}

function findCommonItem(team: string[]) {
  const letterReminder: { [k: string]: number } = {};
  team.forEach((items) => {
    const itemArray = [...new Set(items.split(''))];
    itemArray.forEach(
      (item) =>
        (letterReminder[item] = letterReminder[item]
          ? (letterReminder[item] += 1)
          : (letterReminder[item] = 1)),
    );
  });
  const [badge] = Object.entries(letterReminder).find(([, counter]) => counter >= 3)!;
  return badge;
}

function itemScore(item: string) {
  if (item === item.toUpperCase()) {
    return item.charCodeAt(0) - 38;
  } else {
    return item.charCodeAt(0) - 96;
  }
}

console.log(score);
