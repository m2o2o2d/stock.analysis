import fse from 'fs-extra';
import path from 'path';
import sq3 from 'sqlite3';
import { docDir } from '../utils/setting';

export const dbPath = path.join(docDir, 'data.sqlite3');
fse.ensureFileSync(dbPath);

const sqlite3 = sq3.verbose();
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    /**
     * 交易记录 EXCHANGE_RECORD
     * stock_code 股票代码
     * stock_name 股票名称
     * unit_price 成交单价（元/股）
     * exchange_number 交易数量（股）
     * exchange_type 交易类别：1-买 0-卖
     * service_charge 手续费
     * exchange_time 成交时间
     */
    db.run(`CREATE TABLE IF NOT EXISTS EXCHANGE_RECORD(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        stock_code VARCHAR(30) NOT NULL,
        stock_name VARCHAR(30) NOT NULL,
        unit_price DECIMAL(15,2) NOT NULL,
        exchange_number INTEGER NOT NULL,
        exchange_type INTEGER NOT NULL,
        service_charge DECIMAL(15,2) NOT NULL,
        exchange_time INTEGER NOT NULL
    )`, err => {
        if (err) console.error(err);
    });
});
export default db;
