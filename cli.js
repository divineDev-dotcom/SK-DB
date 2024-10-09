const readline = require('readline');
const db = require('./db'); // Import your database module

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'sk db> '
});

console.log('Welcome to the interactive sk db  CLI. Type your commands below.');
rl.prompt();

rl.on('line', async (line) => {
  const [command, ...args] = line.trim().split(/\s+/);
  try {
    switch (command) {
      case 'create':
        if (args.length < 1) {
          console.log('Usage: create <filename>');
          break;
        }
        await db.create(args[0]);
        console.log(`Database ${args[0]} created.`);
        break;

      case 'init':
        if (args.length < 1) {
          console.log('Usage: init <filename>');
          break;
        }
        await db.init(args[0]);
        console.log(`Database ${args[0]} initialized.`);
        break;

      case 'insert':
        if (args.length < 2) {
          console.log('Usage: insert <filename> <data>');
          break;
        }
        const insertData = JSON.parse(args.slice(1).join(' '));
        await db.insert(args[0], insertData);
        console.log('Entry inserted.');
        break;

      case 'bulkInsert':
        if (args.length < 2) {
          console.log('Usage: bulkInsert <filename> <entries>');
          break;
        }
        const entries = JSON.parse(args.slice(1).join(' '));
        await db.bulkInsert(args[0], entries);
        console.log('Entries inserted.');
        break;

      case 'update':
        if (args.length < 3) {
          console.log('Usage: update <filename> <id> <data>');
          break;
        }
        const updateId = args[1];
        const updateData = JSON.parse(args.slice(2).join(' '));
        await db.update(updateId, updateData);
        console.log('Entry updated.');
        break;

      case 'bulkUpdate':
        if (args.length < 2) {
          console.log('Usage: bulkUpdate <filename> <updates>');
          break;
        }
        const updates = JSON.parse(args.slice(1).join(' '));
        await db.bulkUpdate(args[0], updates);
        console.log('Entries updated.');
        break;

      case 'remove':
        if (args.length < 2) {
          console.log('Usage: remove <filename> <id>');
          break;
        }
        await db.remove(args[0], args[1]);
        console.log('Entry deleted.');
        break;

      case 'bulkRemove':
        if (args.length < 2) {
          console.log('Usage: bulkRemove <filename> <ids>');
          break;
        }
        const ids = JSON.parse(args.slice(1).join(' '));
        await db.bulkRemove(args[0], ids);
        console.log('Entries deleted.');
        break;

      case 'clear':
        if (args.length < 1) {
          console.log('Usage: clear <filename> or clear <filename> <condition>');
          break;
        }
        if (args.length === 1) {
          await db.clear(args[0]);
          console.log('All entries deleted.');
        } else {
          await db.clear(args[0], args[1]);
          console.log(`Entries matching condition "${args[1]}" deleted.`);
        }
        break;

      case 'index':
        if (args.length < 2) {
          console.log('Usage: index <filename> <indexName>');
          break;
        }
        await db.index(args[0], args[1]);
        console.log(`Index ${args[1]} created or updated.`);
        break;

      case 'search':
        if (args.length < 2) {
          console.log('Usage: search <filename> <query>');
          break;
        }
        const searchQuery = args.slice(1).join(' ');
        const searchResults = await db.search(args[0], searchQuery);
        console.log('Search results:', searchResults);
        break;

      case 'reindex':
        if (args.length < 2) {
          console.log('Usage: reindex <filename> <indexName>');
          break;
        }
        await db.reindex(args[0], args[1]);
        console.log(`Index ${args[1]} updated.`);
        break;

      case 'unindex':
        if (args.length < 2) {
          console.log('Usage: unindex <filename> <indexName>');
          break;
        }
        await db.unindex(args[0], args[1]);
        console.log(`Index ${args[1]} deleted.`);
        break;

      case 'sort':
        if (args.length < 3) {
          console.log('Usage: sort <filename> <field> <order>');
          break;
        }
        const sortField = args[1];
        const sortOrder = args[2];
        const sortedData = await db.sort(args[0], sortField, sortOrder);
        console.log('Sorted data:', sortedData);
        break;

      case 'paginate':
        if (args.length < 4) {
          console.log('Usage: paginate <filename> <page> <limit>');
          break;
        }
        const page = parseInt(args[1], 10);
        const limit = parseInt(args[2], 10);
        const paginatedData = await db.paginate(args[0], page, limit);
        console.log('Paginated data:', paginatedData);
        break;

      case 'sortPaginate':
        if (args.length < 5) {
          console.log('Usage: sortPaginate <filename> <field> <order> <page> <limit>');
          break;
        }
        const sortFieldPaginate = args[1];
        const sortOrderPaginate = args[2];
        const pagePaginate = parseInt(args[3], 10);
        const limitPaginate = parseInt(args[4], 10);
        const sortedPaginatedData = await db.sortPaginate(args[0], sortFieldPaginate, sortOrderPaginate, pagePaginate, limitPaginate);
        console.log('Sorted and paginated data:', sortedPaginatedData);
        break;

      case 'count':
        if (args.length < 1) {
          console.log('Usage: count <filename>');
          break;
        }
        const count = await db.count(args[0]);
        console.log('Total entries:', count);
        break;

      case 'sum':
        if (args.length < 2) {
          console.log('Usage: sum <filename> <field>');
          break;
        }
        const sumField = args[1];
        const sum = await db.sum(args[0], sumField);
        console.log('Sum:', sum);
        break;

      case 'max':
        if (args.length < 2) {
          console.log('Usage: max <filename> <field>');
          break;
        }
        const maxField = args[1];
        const max = await db.max(args[0], maxField);
        console.log('Max value:', max);
        break;

      case 'min':
        if (args.length < 2) {
          console.log('Usage: min <filename> <field>');
          break;
        }
        const minField = args[1];
        const min = await db.min(args[0], minField);
        console.log('Min value:', min);
        break;

      case 'avg':
        if (args.length < 2) {
          console.log('Usage: avg <filename> <field>');
          break;
        }
        const avgField = args[1];
        const avg = await db.avg(args[0], avgField);
        console.log('Average value:', avg);
        break;

      case 'mergeStr':
        if (args.length < 2) {
          console.log('Usage: mergeStr <string1> <string2>');
          break;
        }
        const str1 = args[0];
        const str2 = args[1];
        const mergedStr = db.mergeStr(str1, str2);
        console.log('Merged string:', mergedStr);
        break;

      case 'contains':
        if (args.length < 2) {
          console.log('Usage: contains <string> <substring>');
          break;
        }
        const str = args[0];
        const substring = args[1];
        const contains = db.contains(str, substring);
        console.log(`String contains substring: ${contains}`);
        break;

      case 'occurrences':
        if (args.length < 2) {
          console.log('Usage: occurrences <string> <substring>');
          break;
        }
        const string = args[0];
        const sub = args[1];
        const occurrences = db.occurrences(string, sub);
        console.log(`Occurrences of substring: ${occurrences}`);
        break;

      case 'find':
        if (args.length < 2) {
          console.log('Usage: find <filename> <key>');
          break;
        }
        const findKey = args[1];
        const findResult = await db.find(args[0], findKey);
        if (findResult !== null) {
          console.log(`Found value for key "${findKey}":`, findResult);
        } else {
          console.log(`No entry found for key "${findKey}".`);
        }
        break;
      case 'bulkFind':
        if (args.length < 2) {
          console.log('Usage: bulkFind <filename> <key>');
          break;
        }
        const bulkFindKey = args[1];
        const bulkFindResults = await db.bulkFind(args[0], bulkFindKey);
        if (bulkFindResults.length > 0) {
          console.log(`Found values for key "${bulkFindKey}":`, bulkFindResults);
        } else {
          console.log(`No entries found for key "${bulkFindKey}".`);
        }
        break;
      case 'clearScreen':
        console.clear();
        console.log('Screen cleared.');
        break;

      case 'exit':
        rl.close();
        process.exit(0);
        break;

      default:
        console.log(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }

  rl.prompt();
}).on('close', () => {
  console.log('Exiting CLI. Goodbye!');
  process.exit(0);
});
