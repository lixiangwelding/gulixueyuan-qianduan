import request from '@/utils/request'

const api_name = '/eduservice/subject'
export default{
    getAllOneTwoSubject(){
        return request({
            url:`${api_name}`,
            method: 'get'
        })
    }
}
