import Dexie from 'dexie';

const db = new Dexie('MDViewDB');

db.version(1).stores({
  files: '++id, name, uploadedAt',
});

export default db;
