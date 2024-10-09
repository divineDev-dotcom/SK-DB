const fs = require('fs').promises;

function readData(filename) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      if (fileData) {
        return JSON.parse(fileData);
      }
      return {}; // Return empty object if file is empty
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return {}; // File does not exist, return empty object
      } else {
        throw err;
      }
    });
}

function countEntries(filename) {
  return readData(filename)
    .then(data => {
      return Object.keys(data).length;
    })
    .catch(err => {
      console.error('Error counting entries:', err);
      throw err;
    });
}

function sumValues(filename, key) {
  return readData(filename)
    .then(data => {
      return Object.values(data)
        .reduce((sum, entry) => {
          if (entry && typeof entry[key] === 'number') {
            return sum + entry[key];
          }
          return sum;
        }, 0);
    })
    .catch(err => {
      console.error('Error summing values:', err);
      throw err;
    });
}

function maxValue(filename, key) {
  return readData(filename)
    .then(data => {
      return Object.values(data)
        .reduce((max, entry) => {
          if (entry && typeof entry[key] === 'number') {
            return Math.max(max, entry[key]);
          }
          return max;
        }, -Infinity);
    })
    .catch(err => {
      console.error('Error finding maximum value:', err);
      throw err;
    });
}

function minValue(filename, key) {
  return readData(filename)
    .then(data => {
      return Object.values(data)
        .reduce((min, entry) => {
          if (entry && typeof entry[key] === 'number') {
            return Math.min(min, entry[key]);
          }
          return min;
        }, Infinity);
    })
    .catch(err => {
      console.error('Error finding minimum value:', err);
      throw err;
    });
}

function averageValue(filename, key) {
  return readData(filename)
    .then(data => {
      const values = Object.values(data)
        .filter(entry => entry && typeof entry[key] === 'number')
        .map(entry => entry[key]);
      const sum = values.reduce((acc, val) => acc + val, 0);
      return values.length > 0 ? sum / values.length : 0;
    })
    .catch(err => {
      console.error('Error calculating average value:', err);
      throw err;
    });
}

function mergeStrings(filename, key) {
  return readData(filename)
    .then(data => {
      return Object.values(data)
        .filter(entry => typeof entry[key] === 'string')
        .map(entry => entry[key])
        .join(' ');
    })
    .catch(err => {
      console.error('Error merging strings:', err);
      throw err;
    });
}

function containsSubstring(filename, key, substring) {
  return readData(filename)
    .then(data => {
      return Object.values(data)
        .some(entry => typeof entry[key] === 'string' && entry[key].includes(substring));
    })
    .catch(err => {
      console.error('Error checking for substring:', err);
      throw err;
    });
}

function countSubstringOccurrences(filename, key, substring) {
  return readData(filename)
    .then(data => {
      return Object.values(data)
        .filter(entry => typeof entry[key] === 'string')
        .reduce((count, entry) => {
          const matches = (entry[key].match(new RegExp(substring, 'g')) || []).length;
          return count + matches;
        }, 0);
    })
    .catch(err => {
      console.error('Error counting substring occurrences:', err);
      throw err;
    });
}

module.exports = {
  countEntries,
  sumValues,
  maxValue,
  minValue,
  averageValue,
  mergeStrings,
  containsSubstring,
  countSubstringOccurrences
};
