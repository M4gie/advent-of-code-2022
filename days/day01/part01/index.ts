const input = process.argv[2];

const inventories = input.split('\n\n');
let bestCalories = 0;

inventories.forEach(inventory => {
  const invSum = inventory.split('\n').reduce((prev, curr) => prev + Number(curr), 0);
  if(invSum > bestCalories) {
    bestCalories = invSum;
  }
});

console.log(bestCalories)
