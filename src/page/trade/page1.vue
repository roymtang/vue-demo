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
    import $ from 'jquery'

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
                Vue.axios.post(_url, _data).then((response) => {
                    var parser = new DOMParser();
                    //var xmldoc = parser.parseFromString(response.data, 'text/xml')
                    var xmldoc = parser.parseFromString("<gnnt><test1>1</test1><test1>2</test1></gnnt>", "text/xml")


                    var childrens = xmldoc.childNodes;
                    var json = "";

                    for (var i = 0; i < childrens.length; i++) {
                        var _children = childrens[i].childNodes;
                        if (_children != null) {
                            json += '"' + childrens[i].nodeName
                        }

                        //json += '"' + childrens[i].nodeName + '":' + '"' + childrens[i].childNodes[0].nodeValue + '"'
                    }

                    console.log(json)

                }, (response) => {
                    console.log(response)
                })
            }
        }
    }


    function loadXml(str) {
        if (str == null) {
            return null;
        }
        var doc = str;
        try{
            doc = createXMLDOM();
            doc.async = false;
            doc.loadXML(str);
        }catch(e){
            doc = $.parseXML(str);
        }
        return doc;
    }


    /**
     *xml对象转json对象
     *xmlObj:xml对象
     *nodename:节点路径('ROOT/ITEM')
     *isarray:true,强制返回数组对象
     **/
    function xmltojson(xmlObj,nodename,isarray){


    }


</script>