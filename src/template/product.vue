<template>
    <div>
        <el-row type="flex" justify="left">
            <el-col :span="8">
                <el-form label-position="right" ref="novelForm" label-width="100px" :rules="rules" :model="novelForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="novelForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="url" prop="url">
                        <el-input v-model="novelForm.url"></el-input>
                    </el-form-item>
                    <el-form-item label="章节选择器" prop="node">
                        <el-input v-model="novelForm.node"></el-input>
                    </el-form-item>
                    <el-form-item label="正文正则" prop="chilNode">
                        <el-input v-model="novelForm.chilNode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('novelForm')">查找</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import http from '../methods/methods'
    import path from 'path'
    export default{
        data(){
            let validation = (rule, value, callback) => {
                let ble = (this.novelForm.url&&this.novelForm.node&&this.novelForm.chilNode)||(this.novelForm.url||this.novelForm.node||this.novelForm.chilNode);
                if (ble&&!value) {
                    let obj = {
                        url:'url',
                        node:'章节选择器',
                        chilNode:'正文正则'
                    };
                    return callback(new Error('请输入'+obj[rule.field]));
                }
                callback()
            };
            return{
                novelForm:{
                    name:'',
                    url:'',
                    node:'',
                    chilNode:''
                },
                rules:{
                    name:[
                        {required: true, message: '请输入小说名称', trigger: 'blur'}
                    ],
                    url:[
                        { validator: validation, trigger: 'blur'}
                    ],
                    node:[
                        { validator: validation, trigger: 'blur'}
                    ],
                    chilNode:[
                        { validator: validation, trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            onSubmit(fromName){
                this.$refs[fromName].validate((valid) => {
                    if (valid) {
                        let data = {};
                        Object.keys(this.novelForm).forEach((item)=>{this.novelForm[item]&&(data[item]=this.novelForm[item])});
                        http('GET','http://47.94.197.184:3000/api/novel',data).then((res)=>{
                            console.log(res);
                            location.href = path.join('http://47.94.197.184:3000', res.href)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss">

</style>