import {atom} from 'recoil'
interface Job {
    _id: string;
    title: string;
    description: string;
    postedAt: string;
}

interface PostedJobState {
    isLoading:boolean;
    postedJobs:Job[]
}

export const postedJobState = atom<PostedJobState>({
    key:'postedJobState',
    default:{
        isLoading:true,
        postedJobs:[]
    }
})