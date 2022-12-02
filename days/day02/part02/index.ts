const input = process.argv[2];

enum EndStatus {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z',
}

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

const shapes = Object.keys(rules);

const rounds = input.split('\n');

let score = 0;
rounds.forEach((round) => {
  const [opponent, endStatus] = round.split(' ') as unknown as [Shape, EndStatus];
  const opponentShapeRules = rules[opponent];

  if (endStatus === EndStatus.Win) {
    score += rules[opponentShapeRules.beatBy].points;
    score += 6;
  } else if (endStatus === EndStatus.Draw) {
    score += opponentShapeRules.points;
    score += 3;
  } else {
    const shape = shapes.find(
      (shape) => shape !== opponentShapeRules.beatBy && shape !== opponent,
    )! as Shape;
    score += rules[shape].points;
  }
});

console.log(score);
