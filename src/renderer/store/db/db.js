import fse from 'fs-extra';
import path from 'path';
import sq3 from 'sqlite3';
import { docDir } from '../../utils/setting';
import { EXCHANGE_RECORD, STOCK } from './sql/createTable';

export const dbPath = path.join(docDir, 'data.sqlite3');
fse.ensureFileSync(dbPath);

const sqlite3 = sq3.verbose();
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(EXCHANGE_RECORD);
    db.run(STOCK);
}, err => {
    if (err) console.error(err);
});
export default db;
