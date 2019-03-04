import db from '../sql/db';

export default class Stock {

    static create (stock, cb) {
        const sql = `INSERT INTO STOCK 
        (stock_code, stock_name) VALUES (?, ?)`;
        db.run(sql, stock.stockCode, stock.stockName, cb);
    }

    static all (cb) {
        const sql = `SELECT * FROM STOCK`;
        db.all(sql, cb);
    }

    static find (id, cb) {
        const sql = `SELECT * FROM STOCK WHERE id = ?`;
        db.get(sql, id, cb);
    }

    static delete (id, cb) {
        const sql = `DELETE FROM STOCK WHERE id = ?`;
        db.run(sql, id, cb);
    }

};
