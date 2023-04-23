import axios, { AxiosResponse } from "axios"

export enum ResultCodeEnum{
    Success=0,
    Error=1,
    CaptchaisRequired=10
}
type MeTypes={
    data:{id:number,email:string,login:string},
    resultCode:number,
    messages:Array<string>
}
export type LoginTypes={
    data:{userId:number},
    resultCode:number,
    messages:Array<string>,
    captcha:string
}

const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers:{
        "API-KEY":"99c4ad40-9f28-463b-9b7f-7ae01e967559"
    }
});

type GetItemsType={
    items:Array<any>,
    totalCount:number,
    error:string|null
}

export const usersAPI={
    getUsers(currentPage:number,pageSize:number,term:string,friend:boolean | null){
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend===null ? '' : `&friend=${friend}`),
        )
        .then(responce=>{ return responce.data});
    },
    changePage(pageNumber:number,pageSize:number){
        return instance.get(`users?page=${pageNumber}&count${pageSize}`,
        {withCredentials:true})
        .then(responce=> { return responce.data});
    
    },
    followUser(id:number){
        return  instance.post(`/follow/${id}`,{}).then(res=>res.data)
    
    },
    unfollowUser(id:number){
        return  instance.delete(`/follow/${id}`)
    
    },
    setProfile(userId:number){
        console.warn("Using old version,please change this one")
        return profileAPI.setProfile(userId);
    },
    login(){
        return  instance.get('auth/me');
    }
}

export const profileAPI={
    setProfile(userId:number){
        return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    },
    setStatus(userId:number){
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        return instance.put(`profile/status`,{status:status})
    },
    savePhotos(photo:any){
        const formData= new FormData()
        formData.append('image',photo)
        return instance.put(`profile/photo`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(data:any){
        return instance.put(`profile`,data)
    },
}




export const authAPI={
    me(){
        return instance.get<MeTypes>('auth/me')  
    },
    login(email:string,password:string,rememberMe=false,captcha:string){
        return instance.post<LoginTypes>('auth/login',{email,password,rememberMe,captcha})  
    },
    
    logOut(){
        return instance.delete('auth/login')  
    }
}

export const securityAPI={
    gettCaptcha(){
        return instance.get('security/get-captcha-url')  
    }
   
}