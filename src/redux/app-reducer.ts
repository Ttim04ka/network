
import { loginThunkCreator } from "./auth-reducer";

const SET_INITIALIZED="SET_INITIALIZED";

export type InitialStateType={
    initialized:boolean
}

let initialState: InitialStateType={
    initialized:false,
}  
const appReducer=(state=initialState,action:any): InitialStateType=>{
    
    switch(action.type){
        case SET_INITIALIZED:
            return{
                ...state,
                initialized:true,
                
            };
        default:
            return state;
    }

}

export default appReducer;

export type SetInitializedActionType={
    type: typeof SET_INITIALIZED //SET_INITIALIZED
}

export const setInitialized=(): SetInitializedActionType=>{
    return {
        type:SET_INITIALIZED
    }
}

export const setInitializedApp=()=>(dispatch: any )=>{
   let promise=dispatch(loginThunkCreator())
   promise.then(()=>{dispatch(setInitialized())})
   
}

