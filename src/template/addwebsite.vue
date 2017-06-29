<template>
    <div>
        <el-row type="flex" justify="left">
            <el-col :span="8">
                <el-form label-position="right" ref="websiteForm" label-width="100px" :rules="rules" :model="websiteForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="websiteForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="网址" prop="url">
                        <el-input v-model="websiteForm.url"></el-input>
                    </el-form-item>
                    <el-form-item label="章节选择器" prop="node">
                        <el-input v-model="websiteForm.node"></el-input>
                    </el-form-item>
                    <el-form-item label="正文正则" prop="chilNode">
                        <el-input v-model="websiteForm.chilNode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('websiteForm')">保存</el-button>
                        <el-button>取消</el-button>
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
                websiteForm:{
                    name:'',
                    url:'',
                    node:'',
                    chilNode:''
                },
                rules:{
                    name:[
                        {required: true, message: '请输入网站名称', trigger: 'blur'}
                    ],
                    url:[
                        {required: true, message: '请输入网址', trigger: 'blur'}
                    ],
                    node:[
                        {required: true, message: '请输入章节选择器', trigger: 'blur'}
                    ],
                    chilNode:[
                        {required: true, message: '请输入正文正则', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            onSubmit(fromName){
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        let data = {};
                        let pos;
                        let id = this.$route.params.id;
                        Object.keys(this.websiteForm).forEach((item)=>{this.websiteForm[item]&&(data[item]=this.websiteForm[item])});
                        id === 'add'?pos = http.addWebsite(data):pos = http.upWebsite(id,data);
                        pos.then(()=>{
                            this.$router.push({path:'/admin/'})
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
            if(id){
                http.getWebsite('',id).then((res)=>{
                    let data = res.data;
                    data&&(this.websiteForm = data);
                })
            }
        }
    }
</script>
<style lang="scss">

</style>