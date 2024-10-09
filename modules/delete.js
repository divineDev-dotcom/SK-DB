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

function deleteEntry(filename, key) {
  return readData(filename)
    .then(existingData => {
      const { [key]: _, ...newData } = existingData; // Remove the entry with the given key
      return fs.writeFile(filename, JSON.stringify(newData, null, 2), 'utf8');
    })
    .then(() => {
      console.log(`Entry "${key}" deleted successfully.`);
    })
    .catch(err => {
      console.error('Error deleting entry:', err);
      throw err;
    });
}

function deleteMany(filename, keys) {
  return readData(filename)
    .then(existingData => {
      const newData = { ...existingData };
      keys.forEach(key => delete newData[key]); // Remove entries with the given keys
      return fs.writeFile(filename, JSON.stringify(newData, null, 2), 'utf8');
    })
    .then(() => {
      console.log('Entries deleted successfully.');
    })
    .catch(err => {
      console.error('Error deleting entries:', err);
      throw err;
    });
}

function deleteAll(filename) {
  return fs.writeFile(filename, JSON.stringify({}, null, 2), 'utf8')
    .then(() => {
      console.log('All entries deleted. Database flushed.');
    })
    .catch(err => {
      console.error('Error flushing database:', err);
      throw err;
    });
}

module.exports = {
  deleteEntry,
  deleteMany,
  deleteAll
};
