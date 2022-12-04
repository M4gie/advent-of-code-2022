const input = process.argv[2];

const backpacks = input.split('\n');

let score = 0;

backpacks.forEach((items) => {
  const duplicatedItem = findCommonItem(items);
  score += itemScore(duplicatedItem!);
});

function findCommonItem(items: string) {
  const itemArray = items.split('');
  const compartment1 = itemArray.slice(0, items.length / 2);
  const compartment2 = itemArray.slice(items.length / 2, items.length);
  const letterReminder: { [k: string]: number } = {};
  compartment1.forEach((item) => (letterReminder[item] = 1));
  for (const item of compartment2) {
    if (letterReminder[item]) {
      return item;
    }
  }
}

function itemScore(item: string) {
  if (item === item.toUpperCase()) {
    return item.charCodeAt(0) - 38;
  } else {
    return item.charCodeAt(0) - 96;
  }
}

console.log(score);
