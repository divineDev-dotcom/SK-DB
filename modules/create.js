const fs = require('fs').promises;
const path = require('path');
function createDatabase(filename, initialData = {}) {
  return fs.writeFile(filename, JSON.stringify(initialData, null, 2), 'utf8')
    .then(() => {
      console.log(`Database created: ${filename}`);
    })
    .catch(err => {
      console.error('Error creating database:', err);
      throw err;
    });
}

function databaseExists(filename) {
  return fs.access(filename, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

function initializeDatabase(filename, initialData = {}) {
  return databaseExists(filename)
    .then(exists => {
      if (!exists) {
        return createDatabase(filename, initialData);
      } else {
        console.log(`Database already exists: ${filename}`);
      }
    });
}

module.exports = {
  createDatabase,
  initializeDatabase
};
