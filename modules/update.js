const fs = require('fs').promises;

function updateData(filename, updates) {
  return fs.readFile(filename, 'utf8')
    .then(fileData => {
      let existingData = {};
      if (fileData) {
        existingData = JSON.parse(fileData);
      }
      
      const newData = { ...existingData, ...updates };
      
      return fs.writeFile(filename, JSON.stringify(newData, null, 2), 'utf8');
    })
    .then(() => {
      console.log('Database updated successfully.');
    })
    .catch(err => {
      console.error('Error updating database:', err);
      throw err;
    });
}

function updateEntry(filename, key, data) {
  const updates = { [key]: data };
  return updateData(filename, updates);
}

function updateEntries(filename, entries) {
  return updateData(filename, entries);
}

module.exports = {
  updateEntry,
  updateEntries
};
