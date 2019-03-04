import db from '../sql/db';

export default class ExchangeRecord {

    static all (cb) {
        const sql = `SELECT * FROM EXCHANGE_RECORD`;
        db.all(sql, cb);
    }

    static find (id, cb) {
        const sql = `SELECT * FROM EXCHANGE_RECORD WHERE id = ?`;
        db.get(sql, id, cb);
    }

    static create (record, cb) {
        const sql = `INSERT INTO EXCHANGE_RECORD 
        (stock_code, stock_name, unit_price, exchange_number, exchange_type, service_charge, exchange_time) VALUES 
        (?, ?, ?, ?, ?, ?, ?)`;
        db.run(sql, record.stockCode, record.stockName, record.unitPrice, record.exchangeNumber, record.exchangeType, record.serviceCharge, record.exchangeTime, cb);
    }

    static update (record, cb) {
        const sql = `UPDATE EXCHANGE_RECORD SET
            stock_code=?,
            stock_name=?,
            unit_price=?,
            exchange_number=?,
            exchange_type=?,
            service_charge=?,
            exchange_time=?
            WHERE id=?
        `;
        db.run(sql, record.stockCode, record.stockName, record.unitPrice, record.exchangeNumber, record.exchangeType, record.serviceCharge, record.exchangeTime, record.id, cb);
    }

    static delete (id, cb) {
        const sql = `DELETE FROM EXCHANGE_RECORD WHERE id = ?`;
        db.run(sql, id, cb);
    }

};
