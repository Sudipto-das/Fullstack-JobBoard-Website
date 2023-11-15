import {atom} from 'recoil'
export const postedJobState = atom({
    key:'postedJobState',
    default:{
        isLoading:true,
        postedJobs:[]
    }
})