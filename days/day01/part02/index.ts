const input = process.argv[2];

const inventories = input.split('\n\n');
const caloriesPerEfl: number[] = [];

inventories.forEach((inventory) => {
  const invSum = inventory.split('\n').reduce((prev, curr) => prev + Number(curr), 0);
  caloriesPerEfl.push(invSum);
});

const sortedCaloriesPerEfl = caloriesPerEfl.sort((a, b) => b - a);
const podiumCalories = sortedCaloriesPerEfl.slice(0, 3);
const podiumCaloriesSum = podiumCalories.reduce((prev, curr) => prev + curr, 0);

console.log(podiumCaloriesSum);
