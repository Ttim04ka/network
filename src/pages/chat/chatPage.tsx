import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMyMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"
import { AppState } from "../../redux/redux-store"




export type messagesInfoType={
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage:React.FC=()=>{
    
    return <div>
        <Chat></Chat>
    </div>

}
const Chat:React.FC=()=>{

    let dispatch=useDispatch()

    useEffect(()=>{
        dispatch(startMessagesListening())
        return ()=>{
            dispatch(stopMessagesListening())
        }
    },[])

    return <div>
       <Messages ></Messages>
       <ChatForm ></ChatForm>
    </div>   
}
const Messages:React.FC=()=>{
    const messageInfo=useSelector((state:AppState)=>state.chatReducer.messages);
    const [activeScroll,setActiveScroll]=useState(true);
    const scrollRef=useRef<HTMLDivElement>(null);
  
    const scrollHandler=(e:any)=>{  
        const element=e.currentTarget;
        if(Math.abs((element.scrollHeight-element.scrollTop)-element.clientHeight)<300){

            !activeScroll && setActiveScroll(true)
        }else{
            activeScroll && setActiveScroll(false)
        }
    }

    useEffect(()=>{
        if(activeScroll){
            scrollRef.current?.scrollIntoView({behavior:'smooth'})
        }
        
    },[messageInfo])


    return <div style={{height:'400px',overflowY:'auto'}} onScroll={scrollHandler}>
        {messageInfo.map((m:any)=><Message message={m} key={m.id}></Message>)}
        <div ref={scrollRef} ></div>
    </div>  
}

const Message:React.FC<{message:messagesInfoType}>=React.memo(({message})=>{
   
    console.log('message')
    return <div>
       <div>
        <img style={{height:'70px',width:'70px',marginRight:'30px'}} src={message.photo} alt=""/>
        <b>{message.userName}</b>
       </div>
       <br />
       {message.message}
       <hr />
    </div>   
})
const ChatForm:React.FC=()=>{ 
    const [message,setMessage]=useState('');
    let status=useSelector((state:AppState)=>state.chatReducer.status)
    let dispatch=useDispatch()
    let sendMessage=()=>{
        if(!message){
            return;
        }
        dispatch(sendMyMessage(message))
        setMessage('')
    }   
   
    return <div>
      <div>
        <textarea onChange={(e)=>{setMessage(e.currentTarget.value)}} value={message}></textarea>
      </div>
      <div><button onClick={sendMessage} disabled={status!=='ready'}>send</button></div>
    </div>   
}
export default ChatPage