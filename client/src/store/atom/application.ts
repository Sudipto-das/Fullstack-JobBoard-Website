import { atom } from 'recoil'
export const applicationState = atom({
    key: 'aplicationState',
    default:
    {
        isLoading:true,
        applications: []
    }

})