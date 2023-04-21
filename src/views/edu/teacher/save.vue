<template>
    <div class="app-container">
    讲师添加
        <el-form ref="teacher" :model="teacher" label-width="80px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name"></el-input>
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number v-model="teacher.sort" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" placeholder="请选择讲师头衔">
                <el-option label="高级讲师" :value="1"></el-option>
                <el-option label="首席讲师" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career"></el-input>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input type="textarea" v-model="teacher.intro"></el-input>
            </el-form-item>
            <el-form-item label="讲师头像">

            <!-- 头衔缩略图 -->
            <pan-thumb :image="teacher.avatar"/>
            <!-- 文件上传按钮 -->
            <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
            </el-button>
            <!-- 讲师头像 -->
            <!--
            v-show：是否显示上传组件
            :key：类似于id，如果一个页面多个图片上传控件，可以做区分
            :url：后台上传的url地址
            @close：关闭上传组件
            @crop-upload-success：上传成功后的回调 -->
            <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/eduoss/fileoss'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
    components: { ImageCropper, PanThumb },
    data() {
      return {
        teacher: {
            name: '',
            sort: 0,
            level:1,
            career:'' ,
            intro:'',
            avatar:'',
        },
        imagecropperShow: false,
        BASE_API: process.env.VUE_APP_BASE_API,
        imagecropperKey:0,//上传组件key值,
      }
    },
    created(){
        // 判断路径中是否有id值 有id值就修改，没有就添加
        console.log()
        if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id
            console.log("路径Id： " + id)
            this.getTeacherInfoById(id)
        }
    },
    methods: {
        saveOrUpdate(){
            if(this.teacher.id){
                this.saveTeacher()
            }
            else{
                this.addTeacher()
            }
        },
        saveTeacher(){
        teacher.updateTeacher(this.teacher)
            .then((response) =>{return this.$message({type: 'success', message: '保存成功！'})})
            this.$router.push({path:'/edu/teacher'})
        },
        addTeacher(){
            teacher.addTeacher(this.teacher)
                .then((response) =>{return this.$message({type: 'success', message: '保存成功！'}) })
                this.$router.push({path: '/edu/teacher'})
        },
        // 回显调用
        getTeacherInfoById(id){
            teacher.getTeacherInfoById(id)
            .then(response =>{
                this.teacher = response.data.teacher
            })
        },
        // 关闭头像上传框
        close(){
            imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data){
            this.imagecropperShow = false
            this.teacher.avatar = data.url
            this.imagecropperKey = this.imagecropperKey + 1
        },
    },

  }
</script>