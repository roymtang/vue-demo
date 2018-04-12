<template>
    <div>
        <el-table :data="tableData.dataList">
            <el-table-column label="委托单号" prop="ORI"></el-table-column>
            <el-table-column label="商品标题" prop="ORT"></el-table-column>
            <el-table-column label="议价信息" prop=""></el-table-column>
            <el-table-column label="品名" prop="BN"></el-table-column>
            <el-table-column label="买卖方向" prop="BS"></el-table-column>
            <el-table-column label="状态" prop=""></el-table-column>
            <el-table-column label="单价" prop="PRI.#cdata"></el-table-column>
            <el-table-column label="商品数量" prop="QTY.#cdata"></el-table-column>
            <el-table-column label="已成交数量" prop="TQ.#cdata"></el-table-column>
            <el-table-column label="委托时间" prop="OT.#cdata"></el-table-column>
            <el-table-column label="交收类型" prop="TY"></el-table-column>
            <el-table-column label="撤单人" prop=""></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="dialogVisible = true">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :current-page="tableData.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.totalPage" style="text-align: right;margin-top: 30px">
        </el-pagination>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>详情</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Vue from 'vue'
    import $ from 'jquery'
    import communication from '../../utils/gnnt.communication'

    const _data = '<?xml version=“1.0” encoding = “GB2312”?>' +
                  '<GNNT>' +
                  '<REQ name="cmd_order_query">' +
                  '</REQ>' +
                  '</GNNT>'

    const _url = "http://172.18.3.37:5379/espot-frontend/webHttpServlet";

    export default {
        data() {
            return {
                tableData: {
                    currentPage: 1,
                    totalPage: 1,
                    dataList: []
                },
                dialogVisible: false
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        },
        created: function () {
            //初始化表格加载数据
            Vue.axios.post(_url, _data).then((response) => {
                var result = communication.xmlToJson(response.data, null, null);
                var list = result.REP.RESULTLIST.REC

                this.tableData.dataList = list
                this.tableData.totalPage = list.length
            }, (response) => {
                console.log(response)
            })
        }
    }


</script>