const fs = require('fs').promises;

function readData(filename) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      console.log(`Reading file: ${filename}`);
      if (fileData.trim() === '') {
        console.log(`File ${filename} is empty.`);
        return {}; // If file is empty, return empty object
      }
      const data = JSON.parse(fileData);
      console.log(`Data read from ${filename}:`, data);
      return data;
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        console.log(`File ${filename} does not exist.`);
        return {}; // File does not exist, return empty object
      } else {
        console.error(`Error reading file ${filename}:`, err);
        throw err;
      }
    });
}

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

function mergeDatabases(sourceFile1, sourceFile2, targetFile) {
  return Promise.all([
    readData(sourceFile1),
    readData(sourceFile2)
  ])
  .then(([data1, data2]) => {
    console.log('Data1:', data1);
    console.log('Data2:', data2);

    const mergedData = deepMerge(data1, data2);
    console.log('Merged Data:', mergedData);

    return fs.writeFile(targetFile, JSON.stringify(mergedData, null, 2), 'utf8');
  })
  .then(() => {
    console.log(`Databases merged into: ${targetFile}`);
  })
  .catch(err => {
    console.error('Error merging databases:', err);
    throw err;
  });
}

module.exports = {
  mergeDatabases
};
