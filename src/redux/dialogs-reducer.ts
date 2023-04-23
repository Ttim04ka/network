import { InfernActionsType } from "./redux-store";

const SEND_NEW_MESSAGE="SEND-NEW-MESSAGE";

export type DialogType={
    id:number,
    name:string
}

let initialState={
    dialogs:[{name:"Frol",id:1},{name:"Nikita",id:1},{name:"Lexa",id:1},{name:"Kirill",id:1},{name:"Matwey",id:1}] as Array<DialogType>,
    messages:[{name:"Hi",id:1},{name:"Hello",id:1},{name:"Privet",id:1},{name:"Arigato",id:1}]as Array<DialogType>,
    newMessageBody:"wadawd" as string|null
};
export type InitialStateType=typeof initialState

const dialogsReducer=(state=initialState,action:ActionTypes):InitialStateType=>{
    
    switch(action.type){
        case SEND_NEW_MESSAGE:
            let body=action.newMessageBody;
            return{
                ...state,
                messages:[...state.messages,{name:body,id:1}],
                newMessageBody:'',
    
            };
        default:
            return state;
    }

}

export default dialogsReducer;



export type ActionTypes=InfernActionsType<typeof actions>
export const actions={
    sendNewMessageActionCreator:(newMessageBody:string)=>{
        return {
            type:SEND_NEW_MESSAGE,newMessageBody
        }as const
    }
}

