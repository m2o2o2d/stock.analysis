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
        <router-view></router-view>
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
body {
    font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
    height: 100vh;
    margin: 0;
}
.app {
    display: flex;
    height: 100%;
    &-menu {
        width: 200px;
        height: 100%;
    }
}
</style>

