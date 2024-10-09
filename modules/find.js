const fs = require('fs').promises;

function findByKey(filename, key) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      if (!fileData) {
        return null; // Return null if the file is empty
      }
      const data = JSON.parse(fileData);
      for (const [id, entry] of Object.entries(data)) {
        if (entry[key] !== undefined) {
          return entry[key]; // Return the first matched value for the given key
        }
      }
      return null; // Return null if no match is found
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return null; // Return null if the file does not exist
      } else {
        throw err; // Throw other errors
      }
    });
}

function findMany(filename, key) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      if (!fileData) {
        return []; // Return an empty array if the file is empty
      }
      const data = JSON.parse(fileData);
      const results = [];
      for (const [id, entry] of Object.entries(data)) {
        if (entry[key] !== undefined) {
          results.push(entry[key]); // Add matched value to the results array
        }
      }
      return results; // Return all matched values
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return []; // Return an empty array if the file does not exist
      } else {
        throw err; // Throw other errors
      }
    });
}

module.exports = {
  findByKey,
  findMany
};
