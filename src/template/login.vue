<template>
    <div>
        <el-row class="login" type="flex" justify="center" align="middle">
            <el-col class="login-main">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="账户">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登陆</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                form:{
                    name:'',
                    password:''
                }
            }
        },
        methods:{
            onSubmit(){
                console.log(this.form);
                this.$router.push('admin')
            }
        }
    }
</script>
<style lang="scss">
    .login{
        height: 100vh;
        .login-main{
            width: 400px;
            padding: 50px 60px 15px 20px;
            border-radius: 10px;
            background-color: #EFF2F7;
        }
    }
</style>