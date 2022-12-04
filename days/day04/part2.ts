const input = process.argv[2];

const assignments = input
  .split('\n')
  .map((assignment) => assignment.split(','))
  .map((pair) => pair.map((assignment) => assignment.split('-').map((pair) => +pair)));

let overlaps = 0;

assignments.forEach(([elf1, elf2], i) => {
  const [start1, end1] = elf1;
  const [start2, end2] = elf2;
  if ((start1 >= start2 && start1 <= end2) || (end1 >= start2 && end1 <= end2)) {
    overlaps++;
  } else if ((start2 >= start1 && start2 <= end1) || (end2 >= start1 && end2 <= end1)) {
    overlaps++;
  }
});

console.log(overlaps);
