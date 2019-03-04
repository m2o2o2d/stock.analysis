<template>
    <div id="app" class="app">
        <el-menu class="app-menu" @select="handleSelect" :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据日志</span>
                </template>
                <el-menu-item index="1-1">交易记录</el-menu-item>
                <el-menu-item index="1-2">转账记录</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view class="app-content"></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {};
    },
    methods: {
        handleSelect (index) {
        }
    }
};
</script>

<style lang="less">
.app {
    display: flex;
    height: 100%;
    &-menu {
        width: 200px;
    }
    &-content {
        padding: 10px;
    }
}
</style>

