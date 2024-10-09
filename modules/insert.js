const fs = require('fs').promises;
const crypto = require('crypto'); // For generating random IDs

function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

function insertData(filename, data) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      let existingData = {};
      if (fileData) {
        existingData = JSON.parse(fileData);
      }
      const newData = { ...existingData, ...data };
      return fs.writeFile(filename, JSON.stringify(newData, null, 2), 'utf8');
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
      } else {
        throw err;
      }
    });
}

function insert1(filename, data) {
  const id = generateId();
  const entry = { [id]: data }; // Wrap data with the unique ID
  return insertData(filename, entry);
}

function insertMany(filename, entries) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      let newData = {};
      if (fileData) {
        newData = JSON.parse(fileData);
      }
      entries.forEach(entry => {
        const id = generateId();
        newData[id] = entry;
      });
      return fs.writeFile(filename, JSON.stringify(newData, null, 2), 'utf8');
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        let newData = {};
        entries.forEach(entry => {
          const id = generateId();
          newData[id] = entry;
        });
        return fs.writeFile(filename, JSON.stringify(newData, null, 2), 'utf8');
      } else {
        throw err;
      }
    });
}

module.exports = {
  insert1,
  insertMany
};
