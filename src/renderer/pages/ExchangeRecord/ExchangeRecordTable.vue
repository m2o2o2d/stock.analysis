<template>
    <div class="c-exchange-record-table">
        <div class="table-btns">
            <el-button @click="getAllExchangeRecords();">刷新</el-button>
            <el-button type="primary" @click="isCreateDlgVisible = true;">新增</el-button>
        </div>
        <el-table :data="data" :row-class-name="rowClassName" max-height="650" border>
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column v-for="(item, index) in columns" :key="index"
                :prop="item.prop"
                :label="item.label"
                v-bind="item.props">
            </el-table-column>
            <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popover width="160" v-model="scope.row.isDeletePopOverVisible">
                        <p>确认删除第{{scope.$index + 1}}行吗？</p>
                        <div style="text-align:right;">
                            <el-button type="text" @click="scope.row.isDeletePopOverVisible = false">取消</el-button>
                            <el-button type="primary" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
                        </div>
                        <el-button type="text" slot="reference">删除</el-button>
                    </el-popover>
                </template>
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
                <el-button @click="isCreateDlgVisible = false;">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="编辑交易记录"
            :visible.sync="isEditDlgVisible"
            width="360px"
            append-to-body>
            <edit-exchange-record :record="operatedRow" ref="editForm" @success="updateAfterEdit"></edit-exchange-record>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleConfirmEdit">确定</el-button>
                <el-button @click="isEditDlgVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import CreateExchangeRecord from './CreateExchangeRecord.vue';
import EditExchangeRecord from './EditExchangeRecord.vue';
export default {
    name: 'ExchangeRecordTable',
    components: { CreateExchangeRecord, EditExchangeRecord },
    props: {},
    data () {
        const columns = [
            { label: '交易类别', prop: 'exchangeType', props: {align: 'center', formatter: this.formatExchangeType} },
            { label: '股票名称', prop: 'stockName', props: {align: 'center'} },
            { label: '股票代码', prop: 'stockCode', props: {align: 'center'} },
            { label: '成交单价', prop: 'unitPrice', props: {align: 'right', 'header-align': 'center'} },
            { label: '交易数量', prop: 'exchangeNumber', props: {align: 'right', 'header-align': 'center'} },
            { label: '手续费', prop: 'serviceCharge', props: {align: 'right', 'header-align': 'center'} },
            { label: '成交时间', prop: 'exchangeTime', props: {align: 'center', width: 120, formatter: row => this.formateDate(row.exchangeTime)} }
        ];
        return {
            data: [],
            columns: columns,
            operatedRow: null,
            isCreateDlgVisible: false,
            isEditDlgVisible: false
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
            return this.$utils.formatExchangeType(row.exchangeType);
        },
        formateDate (ts) {
            return this.$utils.formateDate(ts);
        },
        rowClassName (row, index) {
            if (row && row.exchangeType === this.$consts.EXCHANGE_TYPE.SELL) {
                return 'success-row';
            }
            return '';
        },
        handleEdit (index, row) {
            this.operatedRow = row;
            this.isEditDlgVisible = true;
        },
        handleDelete (index, row) {
            this.deleteExchangeRecord(row);
        },
        handleConfirmCreate () {
            this.$refs.createForm && this.$refs.createForm.createRecord();
        },
        handleConfirmEdit () {
            this.$refs.editForm && this.$refs.editForm.editRecord();
        },
        resetCreateForm () {
            this.$refs.createForm && this.$refs.createForm.reset();
        },
        updateAfterCreate () {
            this.isCreateDlgVisible = false;
            this.getAllExchangeRecords();
        },
        updateAfterEdit () {
            this.isEditDlgVisible = false;
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
                            exchangeTime: item.exchange_time,
                            isDeletePopOverVisible: false
                        };
                    });
                }
            });
        },
        deleteExchangeRecord (row) {
            const sql = `DELETE FROM EXCHANGE_RECORD WHERE ID = ${row.id}`;
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