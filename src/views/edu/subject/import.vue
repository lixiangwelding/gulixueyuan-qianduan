<template>
    <div class="app-container">
        <el-form >
            <el-form-item label="信息描述">
                <el-tag type="info">excel模板说明</el-tag>
                <el-tag >
                    <i class="el-icon-download"></i>
                    <a href="https://edu-teacher-8848.oss-cn-beijing.aliyuncs.com/Excel_Model.xlsx">点击下载模板</a>
                </el-tag>
            </el-form-item>
        </el-form>
        <el-upload
        class="upload-demo"
        drag
        accept=".xlsx"
        :action="BASE_API + '/eduservice/subject/addSubject'"
        :limit="1" 
        :disabled = "improtBtnDisabled"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        name="file"
        multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>{{ fileUploadText }}</em></div>
            <div class="el-upload__tip" slot="tip">只能上传.xsls文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>
<script>
export default {
    data(){
        return{
            BASE_API: process.env.VUE_APP_BASE_API, // 接口API地址 'http://127.0.0.1:9001'
            improtBtnDisabled: false, // 上传按钮是否禁用
            fileUploadText: "选取文件,点击上传",
        }
    },
    methods: {
        fileUploadSuccess(response){
            if(response.success === true){
                this.fileUploadText = '导入成功'
                this.$message({
                    type: 'success',
                    message: response.message
                })
            }
        },
        fileUploadError(){
            this.fileUploadText = '导入失败'
            this.$message({
                type: 'error',
                message: '导入失败'
            })
        }
    }
}
</script>