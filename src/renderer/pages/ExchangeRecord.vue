<template>
    <div class="exchange-record">
        <exchange-record-table></exchange-record-table>
    </div>
</template>
<script>
import ExchangeRecordTable from './ExchangeRecord/ExchangeRecordTable.vue';
export default {
    name: 'ExchangeRecord',
    components: { ExchangeRecordTable },
    props: {},
    data () {
        return {
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created () {},
    mounted () {}
};
</script>
<style lang="less" scoped>
.exchange-record {
    flex: 1;
}
</style>