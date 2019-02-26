<template>
    <div class="c-exchange-record-table">
        <div class="table-btns"></div>
        <el-table :data="data">
            <el-table-column v-for="(item, index) in columns" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :formatter="item.formatter">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'ExchangeRecordTable',
    components: {},
    props: {},
    data () {
        const columns = [
            { label: '交易类别', prop: 'exchangeType' },
            { label: '股票名称', prop: 'stockName' },
            { label: '成交单价', prop: 'unitPrice' },
            { label: '交易数量', prop: 'exchangeNumber' },
            { label: '手续费', prop: 'serviceCharge' },
            { label: '成交时间', prop: 'exchangeTime', formatter: row => this.formateDate(row.exchangeTime) }
        ];
        return {
            data: [],
            columns: columns
        };
    },
    computed: {},
    watch: {},
    methods: {
        formateDate (ts, format = 'YYYY-MM-DD') {
            if (!ts) return '-';
            return this.$moment(ts).format(format);
        },
        getAllExchangeRecords () {
            const sql = 'SELECT * FROM EXCHANGE_RECORD';
            this.$db.all(sql, (err, rows) => {
                if (err) {
                    console.log('搜索失败：' + err);
                } else {
                    this.data = rows.map(item => {
                        return {
                            exchangeType: item.exchange_type,
                            stockName: item.stock_name,
                            unitPrice: item.unit_price,
                            exchangeNumber: item.exchange_number,
                            serviceCharge: item.service_charge,
                            exchangeTime: item.exchange_time
                        };
                    });
                }
            });
        }
    },
    created () {
        this.getAllExchangeRecords();
    },
    mounted () {}
};
</script>
<style lang="less" scoped>
</style>