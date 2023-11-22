import {atom} from 'recoil'

interface Job{
    _id:string;
    title:string;
    description:string;
    company:string;
    salary:number;
}
export const jobState = atom<Job[]>({
    key:'jobState',
    default:[]
})