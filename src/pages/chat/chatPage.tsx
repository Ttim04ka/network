import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMyMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"
import { AppState } from "../../redux/redux-store"
import styles from './chat.module.css'
import { textAreaAdjust } from "../../components/Preloader/FormsControls"



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


    return <div className={styles.field} onScroll={scrollHandler}>
        {messageInfo.map((m:any)=><Message message={m} key={m.id}></Message>)}
        <div ref={scrollRef} ></div>
    </div>  
}

const Message:React.FC<{message:messagesInfoType}>=React.memo(({message})=>{

    return(
    <div className={styles.chat_container}>
       <div>
        <img className={styles.chat_img} src={message.photo} alt=""/>
        <i className={styles.chat_username}>{message.userName}</i>
       </div>
        <div className={styles.chat_message}>{message.message!=="" ? "Сообщение: " + message.message : "Сообщение: Пустое сообщение"}</div> 
    </div> 
    )  
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
   
    return(
    <div>
      <div>
        <textarea className={styles.chat_textarea} placeholder="Введите ваше сообщение..." onChange={(e)=>{setMessage(e.currentTarget.value)}} value={message} onKeyUp={textAreaAdjust}></textarea>
      </div>
      <div><button onClick={sendMessage} disabled={status!=='ready'} className={styles.chat_btn}>send</button></div>
    </div>   
    )
}



export default ChatPage