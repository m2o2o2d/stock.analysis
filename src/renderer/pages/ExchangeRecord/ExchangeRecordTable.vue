<template>
    <div class="c-exchange-record-table">
        <div class="table-btns">
            <el-button @click="handleRefresh">刷新</el-button>
            <el-button type="primary" @click="handleCreate">新增</el-button>
            <el-button type="danger" @click="handleDelete">删除</el-button>
        </div>
        <el-table :data="data" :row-class-name="rowClassName" max-height="650" @selection-change="handleSelectionChange" border>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column v-for="(item, index) in columns" :key="index"
                :prop="item.prop"
                :label="item.label"
                v-bind="item.props">
            </el-table-column>
        </el-table>
        <el-dialog
            title="创建交易记录"
            :visible.sync="isCreateDlgVisible"
            width="360px"
            append-to-body>
            <create-exchange-record ref="createForm" @success="updateAfterCreate"></create-exchange-record>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleConfirmCreate">确定</el-button>
                <el-button @click="handleCancelCreate">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import CreateExchangeRecord from './CreateExchangeRecord.vue';
export default {
    name: 'ExchangeRecordTable',
    components: { CreateExchangeRecord },
    props: {},
    data () {
        const columns = [
            { label: '交易类别', prop: 'exchangeType', props: {align: 'center', formatter: this.formatExchangeType} },
            { label: '股票名称', prop: 'stockName', props: {align: 'center'} },
            { label: '股票代码', prop: 'stockCode', props: {align: 'center'} },
            { label: '成交单价', prop: 'unitPrice', props: {align: 'right', 'header-align': 'center'} },
            { label: '交易数量', prop: 'exchangeNumber', props: {align: 'right', 'header-align': 'center'} },
            { label: '手续费', prop: 'serviceCharge', props: {align: 'right', 'header-align': 'center'} },
            { label: '成交时间', prop: 'exchangeTime', props: {align: 'center', formatter: row => this.formateDate(row.exchangeTime)} }
        ];
        return {
            data: [],
            columns: columns,
            selectedRows: [],
            isCreateDlgVisible: false
        };
    },
    computed: {},
    watch: {
        isCreateDlgVisible (newValue) {
            if (!newValue) {
                // this.resetCreateForm();
            }
        }
    },
    methods: {
        formatExchangeType (row) {
            if (row) {
                switch (row.exchangeType) {
                case this.$consts.EXCHANGE_TYPE.SELL: return '卖出';
                case this.$consts.EXCHANGE_TYPE.BUY: return '买入';
                }
            }
            return '-';
        },
        formateDate (ts, format = 'YYYY-MM-DD') {
            if (!ts) return '-';
            return this.$moment(ts).format(format);
        },
        rowClassName (row, index) {
            if (row && row.exchangeType === this.$consts.EXCHANGE_TYPE.SELL) {
                return 'success-row';
            }
            return '';
        },
        handleSelectionChange (rows) {
            this.selectedRows = rows;
        },
        handleRefresh () {
            this.getAllExchangeRecords();
        },
        handleCreate () {
            this.isCreateDlgVisible = true;
        },
        handleDelete () {
            if (this.selectedRows && this.selectedRows.length) {
                this.deleteExchangeRecords(this.selectedRows);
            }
        },
        handleConfirmCreate () {
            this.$refs.createForm && this.$refs.createForm.createRecord();
        },
        handleCancelCreate () {
            this.isCreateDlgVisible = false;
        },
        resetCreateForm () {
            this.$refs.createForm && this.$refs.createForm.reset();
        },
        updateAfterCreate () {
            this.isCreateDlgVisible = false;
            this.getAllExchangeRecords();
        },
        /*******************
         * 访问数据库
         *******************/
        getAllExchangeRecords () {
            const sql = 'SELECT * FROM EXCHANGE_RECORD';
            this.$db.all(sql, (err, rows) => {
                if (err) {
                    console.log('搜索失败：' + err);
                } else {
                    this.data = rows.map(item => {
                        return {
                            id: item.id,
                            exchangeType: item.exchange_type,
                            stockName: item.stock_name,
                            stockCode: item.stock_code,
                            unitPrice: item.unit_price,
                            exchangeNumber: item.exchange_number,
                            serviceCharge: item.service_charge,
                            exchangeTime: item.exchange_time
                        };
                    });
                }
            });
        },
        deleteExchangeRecords (rows) {
            if (rows && rows.length) {
                let sql = '';
                rows.forEach(item => {
                    sql = sql + `DELETE FROM EXCHANGE_RECORD WHERE ID = ${rows.id}`;
                });
                this.$db.run(sql, err => {
                    if (err) {
                        this.$message.error('删除失败');
                        console.log(err);
                    } else {
                        this.$message.success('删除成功');
                        this.getAllExchangeRecords();
                    }
                });
            }
        }
    },
    created () {
        this.getAllExchangeRecords();
    },
    mounted () {}
};
</script>
<style lang="less" scoped>
.c-exchange-record-table {
    .table-btns {
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>