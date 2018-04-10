<template>
    <el-row>
        <el-col :span="6">
            <img src="../../static/logo.png" height="50" width="170" style="float:left;margin-left: 20px"/>
            <div class="line-vertical-red"></div>
            <span class="p-center">个人中心</span>
        </el-col>
        <el-col :span="12" :offset="2">
            <el-menu default-active="1-1" class="el-menu-demo" mode="horizontal">
                <el-submenu index="1">
                    <template slot="title">首页</template>
                    <el-menu-item index="1-1">E现货</el-menu-item>
                    <el-menu-item index="1-2">发售</el-menu-item>
                    <el-menu-item index="1-3">直供</el-menu-item>
                    <el-menu-item index="1-4">拍卖</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">E现货</el-menu-item>
                <el-menu-item index="3">报表</el-menu-item>
                <el-menu-item index="4">竞价</el-menu-item>
                <el-menu-item index="5">出入金</el-menu-item>
                <el-menu-item index="6">发售</el-menu-item>
                <el-menu-item index="7">直供</el-menu-item>
                <el-menu-item index="8">拍卖</el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="4">
            <el-dropdown class="el-dropdown-box">
                        <span class="el-dropdown-link">
                            个人设置
                        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>帮助</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    .el-header {
        padding: 0;
    }

    .line-vertical-red {
        height: 50px;
        width: 2px;
        background-color: #ff0000;
        float: left;
        margin-left: 5px;
        margin-top: 5px;
    }

    .p-center {
        font-size: 28px;
        color: red;
        line-height: 60px;
        float: right;
    }

    .el-menu-demo {
        text-align: center;
    }

    .el-menu-demo .el-menu-item, .el-submenu__title {
        font-size: 18px;
    }

    .el-dropdown-box {
        font-size: 18px;
        line-height: 60px;
        float: right;
        margin-right: 20px;
    }
</style>
