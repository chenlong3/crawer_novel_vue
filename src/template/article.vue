<template>
    <div class="back">
        <div>vue封装quill</div>
        <div v-editor="log"></div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                text:''
            }
        },
        methods:{
            log(data){
                this.text = data;
                console.log(this.text);
            }
        }
    }
</script>
<style rel="scss">
    .back{
        height: 300px;
    }
</style>