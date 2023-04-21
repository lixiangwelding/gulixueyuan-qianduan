<template>
    <div class="app-container">
        <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

        <el-tree
            :data="subjectList"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all
        />
    </div>
</template>
<script>
import subject from '@/api/edu/subject'

export default {
    data(){
        return{
            subjectList:[],
            defaultProps:{
                children: 'subjectChildren',
                label: 'title'
            }
        }
    },
    created(){
        this.getAllOneTwoSubjectList()
    },
    methods:{
        getAllOneTwoSubjectList(){
            subject.getAllOneTwoSubject().then(response =>{
                if(response.success === true){
                    this.subjectList = response.data.items
                }
            })
        },

    }
}
</script>