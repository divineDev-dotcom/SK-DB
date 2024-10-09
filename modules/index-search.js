const fs = require('fs').promises;
const path = require('path');

function readData(filename) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      return fileData ? JSON.parse(fileData) : {};
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return {}; // File does not exist, return empty object
      }
      throw err;
    });
}

function writeData(filename, data) {
  return fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8');
}

function createOrUpdateIndex(dbFile, indexFile, key) {
  return readData(dbFile)
    .then(data => {
      const index = {};
      
      Object.keys(data).forEach(id => {
        const entry = data[id];
        if (entry && entry[key] != null) {
          const indexValue = entry[key];
          if (!index[indexValue]) {
            index[indexValue] = [];
          }
          index[indexValue].push(id);
        }
      });

      return writeData(indexFile, index);
    })
    .then(() => {
      console.log(`Index created/updated for key: ${key}`);
    })
    .catch(err => {
      console.error('Error creating/updating index:', err);
      throw err;
    });
}

function searchWithIndex(dbFile, indexFile, key, searchTerm) {
  return readData(indexFile)
    .then(index => {
      const ids = index[searchTerm] || [];
      return readData(dbFile)
        .then(data => {
          return ids.map(id => data[id]);
        });
    })
    .catch(err => {
      console.error('Error searching with index:', err);
      throw err;
    });
}

function updateIndex(dbFile, indexFile, key, changedData) {
  return readData(dbFile)
    .then(data => {
      return readData(indexFile)
        .then(index => {
          Object.keys(changedData).forEach(id => {
            const entry = changedData[id];
            if (entry && entry[key] != null) {
              const indexValue = entry[key];
              if (index[indexValue]) {
                index[indexValue].push(id);
              } else {
                index[indexValue] = [id];
              }
            }
          });

          return writeData(indexFile, index);
        });
    })
    .then(() => {
      console.log(`Index updated for key: ${key}`);
    })
    .catch(err => {
      console.error('Error updating index:', err);
      throw err;
    });
}

function deleteIndex(indexFile) {
  return fs.unlink(indexFile)
    .then(() => {
      console.log('Index file deleted.');
    })
    .catch(err => {
      console.error('Error deleting index file:', err);
      throw err;
    });
}

module.exports = {
  createOrUpdateIndex,
  searchWithIndex,
  updateIndex,
  deleteIndex
};
