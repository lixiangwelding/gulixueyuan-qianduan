import request from '@/utils/request'


export default{
    addCourseInfo(courseInfo){
        return request({
            url:`/eduservice/course/addCourseInfo`,
            method: 'post',
            //记得加data:选项
            data: courseInfo
        })
    },
    getListTeacher(){
        return request({
            url:`/eduservice/teacher/findAll`,
            method: 'get',
        })
    },
}