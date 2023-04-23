
import { AppState, InfernActionsType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { messagesInfoType } from "../pages/chat/chatPage";
import { chatApi, createChannel, EventsType } from "../api/chat-api";
import uuid from 'react-uuid'

const SET_MESSAGES="SET_MESSAGES";
const ANTI_DOUBLE='ANTI_DOUBLE';
const STATUS_CHANGED="STATUS_CHANGED";


export type statusChangedType='pending'|'ready'
type messagesType= messagesInfoType & {id:string}

let initialState={
   messages:[] as messagesType[],
   status:'pending' as statusChangedType
};
export type InitialStateType=typeof initialState;

const chatReducer=(state=initialState,action:ActionTypes):InitialStateType=>{
    
    switch(action.type){
        case SET_MESSAGES:
            return{
                ...state,
                messages:[...state.messages, ...action.messages.map(m=>({...m,id:uuid()}))].filter((m,i,array)=>i>=array.length-13)
                
            };
        case ANTI_DOUBLE:
            return{
                ...state,
                messages:[]
            };

        case STATUS_CHANGED:
            return{
                ...state,
                status:action.status
            };

        default:
            return state;
    }

}

export default chatReducer;





export const actions={
    setMessages:(messages:messagesInfoType[])=>{
        return {
            type:SET_MESSAGES,messages
        } as const},
    antiDouble:()=>{
        return {
            type:ANTI_DOUBLE,
        } as const
    },
    statusChanged:(status:statusChangedType)=>{
        return {
            type:STATUS_CHANGED,status
        } as const
    }
    
}
export type ActionTypes=InfernActionsType<typeof actions>








export const startMessagesListening=():ThunkAction<void,AppState,unknown,ActionTypes>=> async (dispatch)=>{

    chatApi.start()
    dispatch(actions.antiDouble());

    chatApi.subscribe('message-subscriber',(message:messagesInfoType[])=>{
       
         dispatch(actions.setMessages(message))
    })
    chatApi.subscribe('status-subscriber',(status:statusChangedType)=>{
        dispatch(actions.statusChanged(status))
   })
}
export const stopMessagesListening=():ThunkAction<void,AppState,unknown,ActionTypes>=> async (dispatch)=>{
   
    chatApi.unsubscribe('message-subscriber',(message:messagesInfoType[])=>{
        dispatch(actions.setMessages(message))
    })
    chatApi.unsubscribe('status-subscriber',(status:statusChangedType)=>{
        dispatch(actions.statusChanged(status))
    })
    chatApi.stop()
}


export const sendMyMessage=(message:string):ThunkAction<void,AppState,unknown,ActionTypes>=> async (dispatch)=>{
    chatApi.send(message)
    
}
   


