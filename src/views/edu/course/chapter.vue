<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="2" finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="提交审核"></el-step>
        </el-steps>
        <el-form label-width="120px">
            <el-form-item>  
                <el-button  style="margin-top: 12px;" @click="previous">上一步</el-button>
                <el-button :disabled="saveBtnDisabled" style="margin-top: 12px;" @click="next">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        saveBtnDisabled: false //保存按钮是否禁用
      };
    },

    methods: {
        previous(){
            console.log('previous')
            this.$router.push({path: '/edu/course/info/1'})
        },
        next() {
            console.log('next')
            this.$router.push({path: '/edu/course/publish/1'})
        }
    }
  }
</script>