const input = process.argv[2];

type ConvertShape = { [k: string]: string };

const convertShape: ConvertShape = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

enum Shape {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

const rules: { [k in Shape]: { points: number; beatBy: Shape } } = {
  A: {
    points: 1,
    beatBy: Shape.Paper,
  },
  B: {
    points: 2,
    beatBy: Shape.Scissors,
  },
  C: {
    points: 3,
    beatBy: Shape.Rock,
  },
};

const rounds = input
  .replace(/Y|X|Z/gi, (matched: keyof ConvertShape) => convertShape[matched])
  .split('\n');

let score = 0;
rounds.forEach((round) => {
  const [opponent, me] = round.split(' ') as unknown as [Shape, Shape];
  const opponentShapeRules = rules[opponent];
  const myShapeRules = rules[me];
  if (opponent === me) {
    score += 3;
  } else if (opponentShapeRules.beatBy === me) {
    score += 6;
  }
  score += myShapeRules.points;
});

console.log(score);
