import { statusChangedType } from "../redux/chat-reducer"



let subscribers={
    'message-subscriber': [] as subscriberType[],
    'status-subscriber': [] as subscriberStatusType[]
}
let ws:WebSocket|null=null


const closeHandler=()=>{
    subscribers['status-subscriber'].forEach(s=>s('pending'))
    console.log('close ws')
    setTimeout(createChannel,3000)
}
const openHandler=()=>{
   subscribers['status-subscriber'].forEach(s=>s('ready'))
}

const messageHandler=(e:MessageEvent)=>{
    subscribers['status-subscriber'].forEach(s=>s('pending'))
    const newMessage=JSON.parse(e.data);
    debugger
    subscribers['message-subscriber'].forEach(s=>s(newMessage))
    subscribers['status-subscriber'].forEach(s=>s('ready'))


}

export const createChannel=()=>{
    ws?.removeEventListener('message',messageHandler)
    ws?.removeEventListener('close',closeHandler);
    ws?.close()
    ws=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close',closeHandler)
    ws.addEventListener('message',messageHandler)
}

export const chatApi={
    subscribe(event:EventsType,subscriber:subscriberType|subscriberStatusType){   
        //@ts-ignore
        subscribers[event].push(subscriber);
    },
    unsubscribe(event:EventsType,subscriber:subscriberType|subscriberStatusType){
        //@ts-ignore
       subscribers[event]=subscribers[event].filter(s=>s!==subscriber);
    },
    send(message:string){
        ws?.send(message)
        ws?.addEventListener('message',messageHandler)
    },
    stop(){
        subscribers['message-subscriber']=[];
        subscribers['status-subscriber']=[]
        ws?.removeEventListener('message',messageHandler)
        ws?.removeEventListener('close',closeHandler)
        ws?.close()
    },
    start(){
        createChannel()
    }
}   

type subscriberType=(message:messageType[])=>void
type subscriberStatusType=(status:statusChangedType)=>void

type messageType={
    message: string
    photo: string
    userId: number
    userName: string
}
export type EventsType='message-subscriber'|'status-subscriber'

