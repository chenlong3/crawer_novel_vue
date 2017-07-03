<template>
    <div>
        <router-link :to="{name: 'addNovel', params: { id: 'add' }}"><el-button type="primary">添加</el-button></router-link>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="小说名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="path"
                    label="路径">
            </el-table-column>
            <el-table-column
                    prop="isFull"
                    label="是否生成">
            </el-table-column>
            <el-table-column
                    prop="upDateAt"
                    label="更新时间">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <router-link :to="{name: 'addNovel', params: { id: scope.row.id }}">
                        <el-button  size="small">编辑</el-button>
                    </router-link>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                    <el-button
                            size="small"
                            @click="download(scope.row.hash)">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import http from '../js/api'
    import {DOWNAPI} from '../js/constant'
    export default{
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            handleDelete(id){
                http.delNovel(id).then(()=>{
                    this.request()
                })
            },
            request(){
                http.getNovel().then((res) => {
                    this.tableData = res.data
                })
            },
            download(hash){
                location.href = DOWNAPI+hash
            }
        },
        created(){
            this.request()
        }
    }
</script>