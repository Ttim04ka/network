import React from 'react';
import { NavLink } from 'react-router-dom';
import dialogs from './Dialogs.module.css'





const DialogsItem=(props)=>{
    return  <div className={dialogs.item}>
        <NavLink to={'/dialogs/'+props.id} className={dialogs.item}>{props.name}</NavLink>
    </div>
}
const Message=(props)=>{
    return <div className={dialogs.item}>{props.name}</div>
}




const Dialogs=(props)=>{
    let dialogsElem=props.dialogs.map(item=><DialogsItem name={item.name} id={item.id}/>);
    let messageElem=props.messages.map(item=><Message name={item.name} id={item.id}/>);
    return(
        <div>
            <h1>Dialogs</h1>
            <div className={dialogs.wrapper}>
                <div className="dialogs">
                    <div className="dialogs_items">
                        {dialogsElem}
                    </div>
                </div>
                <div className="discuss">
                    <div className="discuss_items">
                        {messageElem}
                    </div>
                      
                </div>
            </div>
           
        </div>
    )
}

export default Dialogs;