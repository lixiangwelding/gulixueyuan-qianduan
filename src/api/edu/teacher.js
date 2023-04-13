import request from '@/utils/request'

const api_name = '/eduservice/teacher'
export default{
    //1 讲师列表（条件查询分页）
    //current当前页 limit每页记录数 teacherQuery条件对象
    getPageList(page,limit,teacherQuery){
        return request({
            url:`${api_name}/pageTeacherCondition/${page}/${limit}`,
            method: 'post',
            data: teacherQuery
        })
    },
    // 删除讲师
    deleteTeacherById(id){
        return request({
            url:`${api_name}/${id}`,
            method: 'delete',
        })
    },
    // 增加讲师
    addTeacher(teacher){
        return request({
            url:`${api_name}/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    // 根据id查询讲师
    getTeacherInfoById(id){
        return request({
            url:`${api_name}/getTeacher/${id}`,
            method: 'get',
        })
    },
    // 修改讲师
    updateTeacher(teacher){
        return request({
            url:`${api_name}/updateTeacher`,
            method: 'post',
            data: teacher
        })
    },

}