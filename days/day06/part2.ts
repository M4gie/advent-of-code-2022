const input = process.argv[2];

const buffer = input.split('');
const markerSize = 14;

const index = buffer.findIndex((_, i) => {
  const slice = buffer.slice(i, i + markerSize);
  const marker = new Set(slice);
  if (marker.size === markerSize) {
    return true;
  }
  return false;
});

console.log(index + markerSize);
