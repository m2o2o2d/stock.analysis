import consts from './consts';
import moment from 'moment';

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
const computeServiceCharge = (stockAmount, exchangeType) => {
    const commissionPercent = 0.0003; // 佣金比率
    const transferFee = 0.00002; // 过户费比率
    const stampTax = 0.001; // 印花税比率
    let serviceCharge;
    // 佣金
    let commission = commissionPercent * stockAmount;
    commission = commission > 5 ? commission : 5;
    if (exchangeType === consts.EXCHANGE_TYPE.BUY) {
        serviceCharge = commission + transferFee * stockAmount;
    } else if (exchangeType === consts.EXCHANGE_TYPE.SELL) {
        serviceCharge = commission + (transferFee + stampTax) * stockAmount;
    }
    return formatAmount(serviceCharge);
};

const utils = {
    formatExchangeType,
    formateDate,
    computeServiceCharge
};
export default utils;
