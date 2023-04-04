import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI, usersAPI } from "../api/api";
import { AppState, InfernActionsType } from "./redux-store";

const ADD_POST="ADD_POST";
const DELETE_POST="DELETE_POST";
const UPDATE_NEW_POST_TEXT="UPDATE-NEW-POST-TEXT";
const SET_USERS_PROFILE="SET_USERS_PROFILE";
const SET_STATUS="SET_STATUS";
const UPDATE_PHOTO='UPDATE_PHOTO';
const SAVE_PHOTO='SAVE_PHOTO';
const SAVE_PROFILE='SAVE_PROFILE'

export type ProfileType={
   id:number,
   message:string
}
let initialState={
    postMessage:[{id:0,message:"Hi"}]as Array<ProfileType>,
    newPostText:'it-kamasutra',
    profile:null as any,
    status:"",
    photoURL:''
};
export type InitialStateType=typeof initialState;
const profileReducer=(state=initialState,action:ActionTypes):InitialStateType=>{

    switch(action.type){
        case ADD_POST:
            let newPost={
                id:1,
                message:action.newPostText
            };
            return{
                ...state,
                postMessage:[...state.postMessage,newPost],
            };
        case DELETE_POST:
            return{
                ...state
                
            };
        case SAVE_PHOTO:
            return{...state, profile: {...state.profile,photos:action.photos}};
        case UPDATE_PHOTO:
            return{
                ...state,
                photoURL:action.url
            };
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile:action.profile
            };
        case SAVE_PROFILE:
            return {
                ...state,
                profile:action.data
            };
        case SET_STATUS:
            return {
                ...state,
                status:action.status
            };
        default:
            return state;
    }
    
}

export default profileReducer;






export const actions={
    addPostActionCreator:(newPostText:string)=>{
        return {
            type:ADD_POST,newPostText
        } as const
    } ,
    deletePost:(dleteId:number)=>{
        return {
            type:DELETE_POST,dleteId
        } as const
    },
    setStatus:(status:string)=>{
        return {
            type:SET_STATUS,status
        } as const
    },
    savePhoto:(photos:string)=>{
        return {
            type:SAVE_PHOTO,photos
        } as const
    },
    updatePhoto:(url:string)=>{
        return {
            type:UPDATE_PHOTO,url
        } as const
    },
    saveProf:(data:any)=>{
        return {
            type:SAVE_PROFILE,data
        } as const
    },
    setUsersProfile:(profile:any)=>{
        return {
            type:SET_USERS_PROFILE,profile:profile
        } as const
    }
}
export type ActionTypes=InfernActionsType<typeof actions>

/* export type AddPostActionType={
    type:typeof ADD_POST,
    newPostText:string
}
export type DeletePostActionType={
    type:typeof DELETE_POST,
    dleteId:number
}
export type SetUsersProfileActionType={
    type:typeof SET_USERS_PROFILE,
    profile:any
}
export type SetStatusActionType={
    type:typeof SET_STATUS,
    status:string
}
export type SavePhotoActionType={
    type:typeof SAVE_PHOTO,
    photos:string
}
export type UpdatePhotoActionType={
    type:typeof UPDATE_PHOTO,
    url:string
}
export type SaveProfActionType={
    type:typeof SAVE_PROFILE,
    data:any
}
 */



export const setUserThunkCreator=(userId:number):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch:any)=>{
        usersAPI.setProfile(userId).then(responce=>{
            dispatch(actions.setUsersProfile(responce.data));
          });
    }
}

export const getStatusThunkCreator=(userId:number):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch:any)=>{
        profileAPI.setStatus(userId).then((responce:any)=>{
            dispatch(actions.setStatus(responce.data));
          });
    }
}

export const updateStatusThunkCreator=(status:string):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch:any)=>{
        profileAPI.updateStatus(status).then((responce:any)=>{
            if(responce.data.resultCode===0){
            dispatch(actions.setStatus(status));
          }});
    }
}
export const savePhotoThunkCreator=(photo:string):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch:any)=>{
        debugger;
        profileAPI.savePhotos(photo).then((responce:any)=>{
            debugger;
            if(responce.data.resultCode===0){
               
              dispatch(actions.updatePhoto(responce.data.data.photos.small))
          }});
    }
}
export const saveProfile=(data:any):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch:any)=>{
        profileAPI.saveProfile(data).then((responce:any)=>{
            if(responce.data.resultCode===0){
            dispatch(actions.saveProf(data));
          }});
    }
}