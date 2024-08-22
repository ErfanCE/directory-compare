const { readdir, readFile } = require('node:fs/promises');
const { join } = require('node:path');

const shallow = async (firstDirPath, secondDirPath) => {
  try {
    const [firsrDirFiles, secondDirFiles] = await Promise.all([
      readdir(firstDirPath),
      readdir(secondDirPath)
    ]);

    if (firsrDirFiles.length !== secondDirFiles.length) {
      throw new Error(
        'after {%FORMAT%} comparing, the content of two directories are NOT the same.'
      );
    }

    for (const file of firsrDirFiles) {
      if (!secondDirFiles.includes(file)) {
        throw new Error(
          'after {%FORMAT%} comparing, the content of two directories are NOT the same.'
        );
      }
    }

    return 'after SHALLOW comparing, the content of two directories are the same.';
  } catch (err) {
    throw err;
  }
};

const deep = async (firstDirPath, secondDirPath) => {
  try {
    await shallow(firstDirPath, secondDirPath);

    const firstDirFiles = await readdir(firstDirPath);

    // file: 1.txt, 2.txt, 3.txt
    for (const file of firstDirFiles) {
      const [firstFileContent, secondFileContent] = await Promise.all([
        readFile(join(__dirname, firstDirPath, file), 'utf-8'),
        readFile(join(__dirname, secondDirPath, file), 'utf-8')
      ]);

      if (firstFileContent !== secondFileContent) {
        throw new Error(
          'after {%FORMAT%} comparing, the content of two directories are NOT the same.'
        );
      }
    }

    return 'after DEEP comparing, the content of two directories are the same.';
  } catch (err) {
    throw err;
  }
};

module.exports = { shallow, deep };
