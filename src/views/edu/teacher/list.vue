<template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="讲师">
                <el-input v-model="teacherQuery.name" placeholder="讲师名字"></el-input>
            </el-form-item>
            <el-form-item  label="讲师头衔">
                <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
                    <el-option label="高级讲师" :value="1"></el-option>
                    <el-option label="首席讲师" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间">
                <!-- teacherQuery.begin 和 teacherQuery.end 对应 EduTeacherController里面的pageTeacherCondition中的teacherQuery-->
                <el-date-picker 
                v-model="teacherQuery.begin"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                ></el-date-picker>
            </el-form-item>
            <el-form-item >
                <el-date-picker 
                v-model="teacherQuery.end"
                type="datetime"
                placeholder="选择结束时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                ></el-date-picker>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
        :data="list"
        stripe
        style="width: 100%">
            <el-table-column prop="id" width="180" label="id"></el-table-column>
            <el-table-column prop="name" width="180" label="名称"></el-table-column>
            <el-table-column prop="career" width="180" label="级别"></el-table-column>
            <el-table-column prop="intro" width="180" label="介绍"></el-table-column>
            <el-table-column prop="level" width="180" label="头衔">
                <template slot-scope="scope">{{ scope.row.level ===1? '高级讲师':'首席讲师'}}</template>
            </el-table-column>
            <el-table-column prop="sort" width="180" label="排序"></el-table-column>
            <el-table-column prop="gmtCreate" width="180" label="创建时间"></el-table-column>
            <el-table-column prop="gmtModified" width="180" label="更新时间"></el-table-column>
            <el-table-column  align="center" width="180" label="操作">
                <template slot-scope="scope">
                    <router-link :to="'/edu/teacher/edit/' + scope.row.id">
                        <el-button type="primary" size = "mini" icon = "el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size = "mini" icon = "el-icon-delete" @click="removeTeacherById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
        <div class="app-footer" style="  display: flex; align-content: center ; text-align: center; justify-content: center;">
            <el-pagination  
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"/>
        </div>
    </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
export default ({
    data(){
        return{
            list:null,
            page:1,
            limit:5,
            total: 0,
            teacherQuery:{}

        }
    },
    created(){
        // 页面加载时 获取数据
        this.getList()
    },
    methods:{
        getList(page = 1){
            //分页时 改变当前页码值
            this.page = page

            teacher.getPageList(this.page,this.limit,this.teacherQuery) 
            .then(response =>{
                console.log(response)
                this.list = response.data.rows
                this.total = response.data.total
            }) //请求成功
            .catch(err =>{
                console.log(err)
            }) //请求失败
        },
        removeTeacherById(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'})
                .then(() => {
                    teacher.deleteTeacherById(id)
                        .then((response) =>{
                            this.$message({type:'success',message:'删除成功!'});
                            this.getList()
                        })})
                .catch(() => {
                    this.$message({type: 'info',message: '已取消删除!'})})
        },

    }
})
</script>
