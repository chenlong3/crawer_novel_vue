<template>
    <div>
        <el-row type="flex" justify="left">
            <el-col :span="8">
                <el-form label-position="right" ref="novelForm" label-width="100px" :rules="rules" :model="novelForm">
                    <el-form-item label="所属网站" prop="websiteId">
                        <el-select v-model="novelForm.websiteId" placeholder="请选择">
                            <el-option
                                    v-for="item in websiteList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="novelForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="路径" prop="path">
                        <el-input v-model="novelForm.path"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('novelForm')">保存</el-button>
                        <el-button @click="back()">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import http from '../js/api'
    export default{
        data(){
            return{
                websiteList:[],
                novelForm:{
                    name:'',
                    path:'',
                    websiteId:''
                },
                rules:{
                    name:[
                        {required: true, message: '请输入小说名称', trigger: 'blur'}
                    ],
                    path:[
                        {required: true, message: '请输入路径', trigger: 'blur'}
                    ],
                    websiteId:[
                        {required: true, message: '请选择所属网站', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            onSubmit(fromName){
                console.log(this.novelForm);
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        let data = {};
                        let pos;
                        let id = this.$route.params.id;
                        Object.keys(this.novelForm).forEach((item)=>{this.novelForm[item]&&(data[item]=this.novelForm[item])});
                        id === 'add'?pos = http.addNovel(data):pos = http.upNovel(id,data);
                        pos.then(()=>{
                            this.$router.push({path:'/admin/novel'})
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created(){
            let id = this.$route.params.id;
            if(id&&id!=='add'){
                http.getNovel('',id).then((res)=>{
                    let data = res.data;
                    data&&(this.novelForm = data)
                })
            }
            http.getWebsite().then((res)=>{
                let data = res.data;
                data&&(this.websiteList = data);
            })
        }
    }
</script>
<style lang="scss">

</style>