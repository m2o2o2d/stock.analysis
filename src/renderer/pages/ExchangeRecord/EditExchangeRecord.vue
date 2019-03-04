<template>
    <div class="edit-exchange-record">
        <el-form label-width="80px" label-position="right" :model="form" ref="form">
            <el-form-item label="交易类别" prop="exchangeType">
                <el-select v-model="form.exchangeType" class="full-width">
                    <el-option label="买入" :value="$consts.EXCHANGE_TYPE.BUY"></el-option>
                    <el-option label="卖出" :value="$consts.EXCHANGE_TYPE.SELL"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="股票名称" prop="stockName">
                <el-select v-model="form.stockName" class="full-width" filterable clearable>
                    <el-option v-for="item in stocks" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="股票代码" prop="stockCode">
                {{stockCode}}
            </el-form-item>
            <el-form-item label="成交单价" prop="unitPrice">
                <el-input-number v-model="form.unitPrice" :precision="2" :controls="false"></el-input-number> 元
            </el-form-item>
            <el-form-item label="交易数量" prop="exchangeNumber">
                <el-input-number v-model="form.exchangeNumber" :precision="0" :step="100"></el-input-number> 股
            </el-form-item>
            <el-form-item label="手续费" prop="serviceCharge">
                {{serviceCharge}}
            </el-form-item>
            <el-form-item label="成交时间" prop="exchangeTime">
                <el-date-picker v-model="form.exchangeTime" type="date" clearable class="full-width"></el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'EditExchangeRecord',
    components: {},
    props: {
        record: Object
    },
    data () {
        return {
            form: {
                exchangeType: this.$consts.EXCHANGE_TYPE.BUY,
                stockName: '',
                unitPrice: '',
                exchangeNumber: 100,
                exchangeTime: 0
            },
            stocks: []
        };
    },
    computed: {
        stockCode () {
            const stock = this.stocks.find(item => item.value === this.form.stockName);
            return stock ? stock.stockCode : '';
        },
        serviceCharge () {
            const { exchangeType, unitPrice, exchangeNumber } = this.form;
            return this.$utils.computeServiceCharge(unitPrice * exchangeNumber, exchangeType, this.stockCode);
        }
    },
    watch: {
        record: {
            immediate: true,
            handler: function (newValue) {
                if (newValue) {
                    this.form.exchangeType = newValue.exchangeType;
                    this.form.stockName = newValue.stockName;
                    this.form.unitPrice = newValue.unitPrice;
                    this.form.exchangeNumber = newValue.exchangeNumber;
                    this.form.exchangeTime = this.$moment(newValue.exchangeNumber);
                }
            }
        }
    },
    methods: {
        reset () {
            this.$refs.form && this.$refs.form.resetFields();
        },
        /*******************
         * 访问数据库
         *******************/
        editRecord () {
            const { stockName, unitPrice, exchangeNumber, exchangeType, exchangeTime } = this.form;
            const record = {
                id: this.record && this.record.id,
                stockCode: this.stockCode,
                stockName: stockName,
                unitPrice: unitPrice,
                exchangeNumber: exchangeNumber,
                exchangeType: exchangeType,
                serviceCharge: this.serviceCharge,
                exchangeTime: this.$moment(exchangeTime).valueOf()
            };
            this.$models.ExchangeRecord.update(record, err => {
                if (err) {
                    this.$message.error('更新失败');
                    console.log(err);
                } else {
                    this.$message.success('更新成功');
                    this.$emit('success');
                }
            });
        },
        getAllStocks () {
            this.$models.Stock.all((err, rows) => {
                if (err) {
                    console.log('搜索失败：' + err);
                } else {
                    this.stocks = rows.sort((v1, v2) => v1.stock_name.localeCompare(v2.stock_name, 'zh-CN')).map(item => {
                        return {
                            label: `${item.stock_name}(${item.stock_code})`,
                            value: item.stock_name,
                            stockCode: item.stock_code
                        };
                    });
                }
            });
        }
    },
    created () {
        this.getAllStocks();
    },
    mounted () {}
};
</script>
<style lang="less" scoped>
.edit-exchange-record {
    .full-width {
        width: 100%;
    }
}
</style>