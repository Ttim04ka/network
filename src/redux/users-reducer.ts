import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { AppState, InfernActionsType } from "./redux-store";

const FOLLOW_AC="FOLLOW_AC";
const UNFOLLOW_AC="UNFOLLOW_AC";
const SET_USERS="SET_USERS"
const SET_CURRENT_PAGE="SET_CURRENT_PAGE"
const SET_TOTAL_USERS_COUNT="SET_TOTAL_USERS_COUNT"
const TOGGLE_IS_FETCHING="TOGGLE_IS_FETCHING"
const DISABLE_BTN="DISABLE_BTN"
const SET_FILTER="SET_FILTER"

let initialState={
   users:[] as Array<any>,
   pageSize:9,
   totalUsersCount:0,
   currentPage:1,
   isFetching:true,
   disableBtn:[]as Array<number>,
   filter:{
    term:'',
    friend:null as null|boolean
   }

};
type InitialStateType=typeof initialState
export type FilterStateType=typeof initialState.filter;
const usersReducer=(state=initialState,action:ActionTypes):InitialStateType=>{
    
    switch(action.type){
        case FOLLOW_AC:
            return{
                ...state,
                users:state.users.map(u=>{
                    if(u.id===action.userId){
                        return {...u,followed:true}
                    }
                    return u
                })
            };

        case UNFOLLOW_AC:
            return{
                ...state,
                users:state.users.map(u=>{
                    if(u.id===action.userId){
                        return {...u,followed:false}
                    }
                    return u
                })
            };
        case SET_USERS:
            
            return{
                ...state,
               users:[...action.users]
            };
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage:action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return{
                ...state,
                totalUsersCount:54
            };
        case TOGGLE_IS_FETCHING:
            return{
                ...state,
                isFetching:action.isFetching
            };
        case SET_FILTER:
            return{
                ...state,
                filter:action.payload
            };
        case DISABLE_BTN:
        
        return{
            ...state,
            disableBtn: action.disable 
            ? [...state.disableBtn,action.id]
            : state.disableBtn.filter(id=>id!=action.id)
            
        };
        
        default:
            return state;
    }

}

export default usersReducer;

// export type FollowActionType={
//     type:typeof FOLLOW_AC,
//     userId:number
// }
// export type UnfollowActionType={
//     type:typeof UNFOLLOW_AC,
//     userId:number
// }
// export type SetUsersActionType={
//     type:typeof SET_USERS,
//     users:any
// }
// export type SetCurrentPageActionType={
//     type:typeof SET_CURRENT_PAGE,
//     currentPage:number
// }
// export type SetTotalUsersCountActionType={
//     type:typeof SET_TOTAL_USERS_COUNT,
//     totalCount:number
// }
// export type ChangeLoaderActionType={
//     type:typeof TOGGLE_IS_FETCHING,
//     isFetching:boolean
// }
// export type DisableBtnActionType={
//     type:typeof DISABLE_BTN,
//     disable:boolean,
//     id:number
// }

// export type ActionTypes=FollowActionType|UnfollowActionType|SetUsersActionType|SetCurrentPageActionType|SetTotalUsersCountActionType|ChangeLoaderActionType|DisableBtnActionType


const actions={
    
 follow:(userId:number)=>{
    return {
        type:FOLLOW_AC,userId
    } as const
},
unfollow:(userId:number)=>{
    return {
        type:UNFOLLOW_AC,userId
    } as const
},
setUsers:(users:any)=>{
    return {
        type:SET_USERS,users
    } as const
},
setCurrentPage:(currentPage:number)=>{
    return {
        type:SET_CURRENT_PAGE,currentPage
    } as const 
},
 setTotalUsersCount:(totalCount:number)=>{
    return {
        type:SET_TOTAL_USERS_COUNT,totalCount
    } as const
},
 changeLoader:(isFetching:boolean)=>{
    return {
        type:TOGGLE_IS_FETCHING,isFetching
    } as const
},
 disableBtn:(disable:boolean,id:number)=>{
    return {
        type:DISABLE_BTN,disable,id
    } as const
},
setfilter:(filter:FilterStateType)=>{
    return {
        type:SET_FILTER,payload:filter
    } as const
}

}
export type ActionTypes=InfernActionsType<typeof actions>


// export const follow=(userId:number):FollowActionType=>{
//     return {
//         type:FOLLOW_AC,userId
//     }
// }
// export const unfollow=(userId:number):UnfollowActionType=>{
//     return {
//         type:UNFOLLOW_AC,userId
//     }
// }
// export const setUsers=(users:any):SetUsersActionType=>{
//     return {
//         type:SET_USERS,users
//     }
// }
// export const setCurrentPage=(currentPage:number):SetCurrentPageActionType=>{
//     return {
//         type:SET_CURRENT_PAGE,currentPage
//     }
// }
// export const setTotalUsersCount=(totalCount:number):SetTotalUsersCountActionType=>{
//     return {
//         type:SET_TOTAL_USERS_COUNT,totalCount
//     }
// }
// export const changeLoader=(isFetching:boolean):ChangeLoaderActionType=>{
//     return {
//         type:TOGGLE_IS_FETCHING,isFetching
//     }
// }
// export const disableBtn=(disable:boolean,id:number):DisableBtnActionType=>{
//     return {
//         type:DISABLE_BTN,disable,id
//     }
// }



export const getUserThunkCreator=(currentPage:number,pageSize:number,filter:FilterStateType):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch,getState)=>{
        dispatch(actions.changeLoader(true));
        usersAPI.getUsers(currentPage,pageSize,filter.term,filter.friend).then((data:any)=>{
            dispatch(actions.changeLoader(false));     
            dispatch(actions.setfilter(filter)) 
            dispatch(actions.setCurrentPage(currentPage))
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
        })
    }
}

export const unfollowThunkCreator=(id:number):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch)=>{
        dispatch(actions.disableBtn(true,id));
        usersAPI.unfollowUser(id).then((responce:any)=>{
            
            if(responce.data.resultCode===0){//подписка произошла
                dispatch(actions.unfollow(id));

            }
            dispatch(actions.disableBtn(false,id));
        })
    }
}

export const followThunkCreator=(id:number):ThunkAction<void,AppState,unknown,ActionTypes>=>{
    return (dispatch)=>{
        dispatch(actions.disableBtn(true,id));
        usersAPI.followUser(id).then((responce:any)=>{
            if(responce.resultCode===0){//подписка произошла
                dispatch(actions.follow(id));

            }
            dispatch(actions.disableBtn(false,id));
        })
    }
}