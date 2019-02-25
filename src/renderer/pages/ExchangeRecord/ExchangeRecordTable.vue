<template>
    <div class="c-exchange-record-table">
        <el-table :data="data">
            <el-table-column v-for="(item, index) in columns" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
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
            { label: '成交时间', prop: 'exchangeTime' }
        ];
        return {
            data: [],
            columns: columns
        };
    },
    computed: {},
    watch: {},
    methods: {
        getAllExchangeRecords () {
            const sql = 'SELECT * FROM EXCHANGE_RECORD';
            this.$db.all(sql, (err, rows) => {
                if (err) {
                    console.log('搜索失败：' + err);
                } else {
                    this.data = rows;
                }
            });
        }
    },
    created () {},
    mounted () {}
};
</script>
<style lang="less" scoped>
</style>