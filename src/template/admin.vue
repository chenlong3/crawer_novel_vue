<template>
    <div>
        <div class="menu">
            <el-menu theme="dark" class="menu-top" mode="horizontal">
                logo
            </el-menu>
            <el-menu class="menu-left" @open="handleOpen" @close="handleClose" theme="dark" :default-active="$route.path" :router='true'>
                <el-menu-item-group title="文章管理">
                    <el-menu-item index="/admin"><i class="el-icon-document"></i>小说管理</el-menu-item>
                    <el-menu-item index="/admin/article"><i class="el-icon-document"></i>vue封装quill</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="用户管理">
                    <el-menu-item index="/admin/home" ><i class="el-icon-setting"></i>账号管理</el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss">
    $left:200px;
    $top:80px;
    .menu{
        position: relative;
        .menu-top{
            position: absolute;
            width: 100%;
            height: $top;
            border-bottom:solid 2px #475669;
            color:#ffffff;
            z-index:2;
        }
        .menu-left{
            position: absolute;
            width: $left;
            height: calc(100vh - #{$top});
            padding-top: $top;
        }
    }
    .main{
        position: absolute;
        left:$left;
        top:$top;
        right: 0;
        bottom:0;
        padding: 15px;
    }
</style>