<template>
    <div>
        <router-link :to="{name: 'addWebsite', params: { id: 'add' }}"><el-button type="primary">添加</el-button></router-link>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="网站名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="url">
            </el-table-column>
            <el-table-column
                    prop="node"
                    label="章节选择器">
            </el-table-column>
            <el-table-column
                    prop="chilNode"
                    label="正文正则">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{name: 'addWebsite', params: { id: scope.row.id }}">
                        <el-button  size="small">编辑</el-button>
                    </router-link>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import http from '../js/api'
    export default{
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            handleDelete(id){
                http.delWebsite(id).then(()=>{
                    this.request()
                })
            },
            request(){
                http.getWebsite().then((res) => {
                    this.tableData = res.data
                })
            }
        },
        created(){
           this.request()
        }
    }
</script>