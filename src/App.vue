<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside width="220px">
                <el-menu router>
                    <el-submenu index="1">
                        <template slot="title">交易管理</template>
                        <el-menu-item index="1-1" :route="{path: '/nav/first'}">发布委托1</el-menu-item>
                        <el-menu-item index="/nav/second">委托管理</el-menu-item>
                        <el-menu-item index="1-3" :route="{path: '/nav/first'}">议价管理</el-menu-item>
                        <el-menu-item index="1-4" :route="{path: '/nav/first'}">我的订单</el-menu-item>
                        <el-menu-item index="1-5">我的成交</el-menu-item>
                        <el-menu-item index="1-6">协议交收合同管理</el-menu-item>
                        <el-menu-item index="1-7">自主交收合同管理</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        name: 'App',
        components: {Header}
    }
</script>

<style>

</style>
