<template>
    <el-table :data="tableData">
        <el-table-column label="委托单号" prop="ORI"></el-table-column>
        <el-table-column label="商品标题" prop="ORT"></el-table-column>
        <el-table-column label="议价信息" prop=""></el-table-column>
        <el-table-column label="品名" prop="BN"></el-table-column>
        <el-table-column label="买卖方向" prop="BS"></el-table-column>
        <el-table-column label="状态" prop=""></el-table-column>
        <el-table-column label="单价" prop="PRI"></el-table-column>
        <el-table-column label="商品数量" prop="QTY"></el-table-column>
        <el-table-column label="已成交数量" prop="TQ"></el-table-column>
        <el-table-column label="委托时间" prop="OT"></el-table-column>
        <el-table-column label="交收类型" prop="TY"></el-table-column>
        <el-table-column label="撤单人" prop=""></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="getData()">加载</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    Vue.use(VueResource)

    const _data = '<?xml version=“1.0” encoding = “GB2312”?>' +
                '<GNNT>' +
                '<REQ name="cmd_order_info_query">' +
                '<ORI>1000000</ORI>' +
                '</REQ>' +
                '</GNNT>';
    const _url = "http://172.18.3.37:5379/espot-frontend/webHttpServlet";

    export default {
        data() {
            return {
                tableData:[
                    {
                        "ORI": "1000000",
                        "ORT": "西瓜",
                        "BN": "西瓜"
                    }
                ]
            }
        },
        methods: {
            getData: function () {
                this.$http({
                    url: _url,
                    method: 'post',
                    params: _data,
                    credientials: false,
                    emulateHTTP: true
                }).then((response) => {
                    console.log(response)
                }, (response) => {
                    console.log(response)
                })
            }
        }
    }
</script>