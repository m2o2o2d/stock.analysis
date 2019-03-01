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
export const EXCHANGE_RECORD = `CREATE TABLE IF NOT EXISTS EXCHANGE_RECORD(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    stock_code VARCHAR(30) NOT NULL,
    stock_name VARCHAR(30) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    exchange_number INTEGER NOT NULL,
    exchange_type INTEGER NOT NULL,
    service_charge DECIMAL(15,2) NOT NULL,
    exchange_time INTEGER NOT NULL
)`;

/**
 * 股票 STOCK
 * stock_code 股票代码
 * stock_name 股票名称
 */
export const STOCK = `CREATE TABLE IF NOT EXISTS STOCK(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    stock_code VARCHAR(30) NOT NULL,
    stock_name VARCHAR(30) NOT NULL
)`;
