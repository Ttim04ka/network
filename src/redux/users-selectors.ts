import { createSelector } from "reselect"
import { AppState } from "./redux-store";

export const getUsers=(state:AppState)=>{
    return state.usersReducer.users
}
export const getUsersSuperSelector=createSelector(getUsers,(users)=>{
    return users;
})
export const getPageSize=(state:AppState)=>{
    return state.usersReducer.pageSize
}
export const getTotalUsersCount=(state:AppState)=>{
    return state.usersReducer.totalUsersCount
}
export const getCurrentPage=(state:AppState)=>{
    return state.usersReducer.currentPage
}
export const getIsFetching=(state:AppState)=>{
    return state.usersReducer.isFetching
}
export const getDisabledBtn=(state:AppState)=>{
    return state.usersReducer.disableBtn
}
export const getFilter=(state:AppState)=>{
    return state.usersReducer.filter
}
