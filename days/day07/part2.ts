const input = process.argv[2].split('\n').slice(1);

type File = {
  name: string;
  size: number;
};

type Directory = {
  name: string;
  files: File[];
  folders: Directory[];
};

function handleCommandLine(current: Directory) {
  while (input.length > 0) {
    const termLine = input.shift()!.split(' ');
    if (!isNaN(Number(termLine[0]))) {
      const [size, name] = termLine;
      current.files.push({ name, size: Number(size) });
    } else if (termLine[1] === 'ls') {
      continue;
    } else if (termLine[1] === 'cd') {
      const [, , dirName] = termLine;
      if (dirName === '..') {
        break;
      }
      const subDir = current.folders.find(({ name }) => name === dirName);
      handleCommandLine(subDir!);
    } else if (termLine[0] === 'dir') {
      const [, name] = termLine;
      current.folders.push({ name, files: [], folders: [] });
    }
  }
}

const tree: Directory = {
  name: '/',
  files: [],
  folders: [],
};
handleCommandLine(tree);

let directoriesSizes: number[] = [];

function computeFolderSize(folder: Directory): number {
  const filesSize = folder.files.reduce((prev, cur) => prev + cur.size, 0);
  const subFoldersSizes = folder.folders.map(computeFolderSize);
  const subFoldersSize = subFoldersSizes.reduce((prev, cur) => prev + cur, 0);
  const totalSize = filesSize + subFoldersSize;
  directoriesSizes.push(totalSize);
  return totalSize;
}

const usedDisk = computeFolderSize(tree);
const freeSpace = 70000000 - usedDisk;
const diskRequired = 30000000 - freeSpace;
directoriesSizes.sort((a, b) => a - b);

console.log(directoriesSizes.find((size) => size >= diskRequired));
