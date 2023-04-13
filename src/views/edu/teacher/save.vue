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
            <el-form-item>
                <el-button type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
export default {
    data() {
      return {
        teacher: {
            name: '',
            sort: 0,
            level:1,
            career:'' ,
            intro:'',
            avatar:'',
        }
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
    },

  }
</script>