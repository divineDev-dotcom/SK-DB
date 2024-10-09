const {
  countEntries,
  sumValues,
  maxValue,
  minValue,
  averageValue,
  mergeStrings,
  containsSubstring,
  countSubstringOccurrences
} = require('./modules/aggregation');  // Assuming these are from aggregation or similar module
const {
  createDatabase,
  initializeDatabase
} = require('./modules/create');
const {
  deleteEntry,
  deleteMany,
  deleteAll
} = require('./modules/delete');
const {
  findByKey,
  findMany
} = require('./modules/find');
const {
  createOrUpdateIndex,
  searchWithIndex,
  updateIndex,
  deleteIndex
} = require('./modules/index-search');
const {
  insert1,
  insertMany
} = require('./modules/insert');
const {
  mergeDatabases
} = require('./modules/merge');
const {
  sortData,
  paginateData,
  sortAndPaginate
} = require('./modules/pagination-sorting');
const {
  updateEntry,
  updateEntries
} = require('./modules/update');
module.exports = {
  count: countEntries,
  sum: sumValues,
  max: maxValue,
  min: minValue,
  avg: averageValue,
  mergeStr: mergeStrings,
  contains: containsSubstring,
  occurrences: countSubstringOccurrences,
  create: createDatabase,
  init: initializeDatabase,
  remove: deleteEntry,
  bulkRemove: deleteMany,
  clear: deleteAll,
  index: createOrUpdateIndex,
  search: searchWithIndex,
  reindex: updateIndex,
  unindex: deleteIndex,
  insert: insert1,
  bulkInsert: insertMany,
  merge: mergeDatabases,
  sort: sortData,
  paginate: paginateData,
  sortPaginate: sortAndPaginate,
  update: updateEntry,
  bulkUpdate: updateEntries,
  find: findByKey,
  bulkFind: findMany
};
