import { authAPI, ResultCodeEnum, securityAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { AppState, InfernActionsType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const SET_USER_DATA="SET_USER_DATA";
const TOGGLE_IS_FETCHING="TOGGLE_IS_FETCHING"
const GET_CAPTCHA_URL_SUCCSESS="GET_CAPTCHA_URL";




let initialState={
    userId:null as number|null,
    email:null as string|null,
    login:null as string|null,
    isFetching:false, 
    isAuth:false,
    captchaURL:null as string|null
};
export type InitialStateType=typeof initialState;

const authReducer=(state=initialState,action:ActionTypes):InitialStateType=>{
    
    switch(action.type){
        case SET_USER_DATA:
            return{
                ...state,
                ...action.data,
            };
        case TOGGLE_IS_FETCHING:
            return{
                ...state,
                isFetching:action.isFetching
            };

        case GET_CAPTCHA_URL_SUCCSESS:
            return{
                ...state,
                captchaURL:action.captcha
            };
    
            
        default:
            return state;
    }

}

export default authReducer;





export const actions={
    getCaptcha:(captcha:string)=>{
        return {
            type:GET_CAPTCHA_URL_SUCCSESS,captcha
        } as const},
    setUserData:(userId:number|null,email:string|null,login:string|null,isAuth:boolean)=>{
        return {
            type:SET_USER_DATA,data:{userId,email,login,isAuth}
        } as const},
    changeLoader:(isFetching:boolean)=>{
        return {
            type:TOGGLE_IS_FETCHING,isFetching
        }as const },
    
    stopSubmit:(form: string, errors?:any)=>{
        return errors 
    } 

    
}
export type ActionTypes=InfernActionsType<typeof actions>







export const loginThunkCreator=():ThunkAction<Promise<void>,AppState,unknown,ActionTypes>=>(dispatch)=>{
    
    return usersAPI.login().then((responce:any)=>{
        dispatch(actions.changeLoader(true))
        if(responce.data.resultCode===0){
            dispatch(actions.changeLoader(false))
            let {id,email,login}=responce.data.data;
            dispatch(actions.setUserData(id,email,login,true));
        }else{
            console.warn('you should log in');
            dispatch(actions.changeLoader(false))
        }
    })
    
}
export const logIn=(email:string,password:string,rememberMe:boolean,captcha:string):ThunkAction<Promise<void>,AppState,unknown,ActionTypes>=>{
    return async (dispatch)=>{
        
       let responce=await authAPI.login(email,password,rememberMe,captcha)
        if(responce.data.resultCode===ResultCodeEnum.Success){
            dispatch(loginThunkCreator())
        }else{
            if(responce.data.resultCode===10){
                dispatch(getCaptchaURL());
            }
            let message=responce.data.messages.length>0 ? responce.data.messages[0] : "Some Error" 
            dispatch(stopSubmit('login',{errors:message}))
        }
        
    }
}


export const logout=():ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch)=>{
        authAPI.logOut().then((responce:any)=>{
            if(responce.data.resultCode===0){
                dispatch(actions.setUserData(null,null,null,false));
            }
        })
    }
}

export const getCaptchaURL=():ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch)=>{
        securityAPI.gettCaptcha().then((responce:any)=>{
            const captchaURL=responce.data.url;
            dispatch(actions.getCaptcha(captchaURL))
        })
    }
}