<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="1" finish-status="success">
            <el-step title="填写课程基本信息"></el-step>
            <el-step title="创建课程大纲"></el-step>
            <el-step title="提交审核"></el-step>
        </el-steps>
        <el-form label-width="120px">
          <el-form-item label="课程标题">
          <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
          </el-form-item>

            <!-- 所属分类 TODO -->
            <!-- 一级分类 -->
            <el-form-item label="一级分类">
              <el-select v-model="courseInfo.subjectParentId" 
                        placeholder="请选择所属分类" 
                        @change="subjectLevelOneChanged"
              >
                <el-option 
                v-for="subject in subjectOneList"
                :key="subject.id"
                :label="subject.title" 
                :value="subject.id"></el-option>
              </el-select>
            <!-- 二级分类 -->
              <el-select v-model="courseInfo.subjectId" placeholder="请选择所属分类">
                <el-option 
                v-for="subject in subjectTwoList"
                :key="subject.id"
                :label="subject.title" 
                :value="subject.id"></el-option>
              </el-select>
            </el-form-item> 



            <!-- 课程讲师 TODO -->
            <el-form-item label="课程讲师">
              <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                <el-option
                  v-for="teacher in teacherList"
                  :key="teacher.id"
                  :label="teacher.name"
                  :value="teacher.id">
                </el-option>
              </el-select>
            </el-form-item> 

            <el-form-item label="总课时">
              <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
            </el-form-item>

            <!-- 课程简介 TODO -->
          <el-form-item label="课程简介">
          <el-input v-model="courseInfo.description" placeholder="请简单描述课程"/>
          </el-form-item>
            <!-- 课程封面 TODO -->

            <el-form-item label="课程价格">
              <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
            </el-form-item>
            <el-form-item>  
                <el-button :disabled="saveBtnDisabled" style="margin-top: 12px;" @click="saveOrUpdate">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
const defaultForm ={
  title: '',
  subjectId: '',//二级分类id
  subjectParentId: '',//一级分类id
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: '',
  price: 0
}
  export default {
    data() {
      return {
        saveBtnDisabled: false ,//保存按钮是否禁用
        courseInfo: defaultForm,
        teacherList:[], //封装所有讲师
        subjectOneList:[],//一级分类
        subjectTwoList:[],//二级分类
      };
    },
    created(){
      //初始化所有讲师
      this.getListTeacher()
      this.getAllOneTwoSubject()
    },
    methods: {
      subjectLevelOneChanged(value){
        //框架已经封装过了 value就是一级分类的id值
      //根据id值查询二级分类
        for (var index = 0; index < this.subjectOneList.length; index++) {
          const subjectOne = this.subjectOneList[index]
          if (subjectOne.id === value) {
            this.subjectTwoList= subjectOne.subjectChildren
            this.courseInfo.subjectId =''
          }
          
        }
        //TODO 明天再写
      },
      //查询所有讲师
      getListTeacher(){
        course.getListTeacher()
          .then(respones =>{
            this.teacherList = respones.data.items
          })
      },
      //查询一二级分类
      getAllOneTwoSubject(){
        subject.getAllOneTwoSubject()
          .then(response =>{
            this.subjectOneList = response.data.items
          })
      },
      
      
      saveOrUpdate() {
        course.addCourseInfo(this.courseInfo)
          .then(response =>{
            this.$message({
              type:'success',
              message:'添加课程信息成功！'
            });
          //跳转
          console.log(response.data.courseId);
          this.$router.push({path: '/edu/course/chapter/'+ response.data.courseId})
          })
          .catch(err =>{
            this.$message({
              type:'fail',
              message:'添加课程信息失败！'
            });
          })

      }
    }
  }
</script>