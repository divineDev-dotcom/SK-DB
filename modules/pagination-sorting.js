const fs = require('fs').promises;

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

function sortData(data, sortKey, sortOrder = 'asc') {
  const entries = Object.values(data);
  
  entries.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return entries;
}

function paginateData(data, pageNumber, pageSize) {
  const entries = Object.values(data);
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  return entries.slice(start, end);
}

function sortAndPaginate(dbFile, sortKey, sortOrder, pageNumber, pageSize) {
  return readData(dbFile)
    .then(data => {
      const sortedData = sortData(data, sortKey, sortOrder);
      const paginatedData = paginateData(sortedData, pageNumber, pageSize);
      return paginatedData;
    })
    .catch(err => {
      console.error('Error sorting and paginating data:', err);
      throw err;
    });
}

module.exports = {
  sortData,
  paginateData,
  sortAndPaginate
};
