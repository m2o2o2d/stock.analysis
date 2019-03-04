import consts from './consts';
import moment from 'moment';
import XLSX from 'xlsx';

// 金额四舍五入到2位小数
const formatAmount = (amount) => {
    return Math.round(amount * 100) / 100;
};

// 交易类型exchangeType转label
const formatExchangeType = (exchangeType) => {
    switch (exchangeType) {
    case consts.EXCHANGE_TYPE.SELL: return '卖出';
    case consts.EXCHANGE_TYPE.BUY: return '买入';
    default: return '-';
    }
};

// 时间戳转日期
const formateDate = (ts, format = 'YYYY-MM-DD') => {
    if (!ts) return '-';
    return moment(ts).format(format);
};

// 计算手续费
const computeServiceCharge = (stockAmount, exchangeType, stockCode) => {
    const commissionPercent = 0.0003; // 佣金比率
    const stampTax = 0.001; // 印花税比率
    let transferFee = 0.00002; // 过户费比率
    let serviceCharge;
    // 佣金
    let commission = commissionPercent * stockAmount;
    commission = commission > 5 ? commission : 5;
    // 过户费
    if (stockCode.startsWith('00')) { // 深市A股
        transferFee = 0;
    }
    if (exchangeType === consts.EXCHANGE_TYPE.BUY) {
        serviceCharge = commission + transferFee * stockAmount;
    } else if (exchangeType === consts.EXCHANGE_TYPE.SELL) {
        serviceCharge = commission + (transferFee + stampTax) * stockAmount;
    }
    return formatAmount(serviceCharge);
};

// 导入excel
const readExcel = file => {
    return new Promise((resolve, reject) => {
        let reader = new window.FileReader();
        reader.onload = function (f) {
            let workbook;
            try {
                let data = f.target.result;
                workbook = XLSX.read(data, { type: 'binary' });
            } catch (e) {
                reject(new Error('文件类型不正确'));
            }
            let rows = [];
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    rows = rows.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break;
                }
            }
            resolve(rows);
        };
        reader.readAsBinaryString(file);
    });
};

const utils = {
    formatExchangeType,
    formateDate,
    computeServiceCharge,
    readExcel
};
export default utils;
