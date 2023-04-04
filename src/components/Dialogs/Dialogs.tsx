import React from 'react';
import { NavLink} from 'react-router-dom';
import dialogs from './Dialogs.module.css'
import { Field, GenericField, reduxForm } from 'redux-form';


import { DialogType } from '../../redux/dialogs-reducer';
import { Textarea } from '../Preloader/FormsControls';
import { maxLengthCreator, requiredField } from '../../utils/validations/valid';

type YourCustomProps={
    name:string,
    placeholder:string,
    validate:any,
    component:any,
    text:string

}

const maxLength10=maxLengthCreator(50)
const AddMessageForm=(props:{handleSubmit:any})=>{
    const YourCustomField = Field as new () => GenericField<YourCustomProps>;
    return <form onSubmit={props.handleSubmit}>
        <div>
            <YourCustomField component={Textarea} validate={[requiredField,maxLength10]} name="newMessageBody" placeholder="Enter your message" text={`textarea`}></YourCustomField>
        </div>
        <div><button>Send</button></div>
    </form>
}

const AddMessageFormRedux=reduxForm({form:'dialogMessageForm'})(AddMessageForm)


type DialogsItemType={
    id:number,
    name?:string
}
const DialogsItem=(props:DialogsItemType)=>{
    return  <div className={dialogs.item}>
        <NavLink to={'/dialogs/'+props.id} className={dialogs.item}>{props.name}</NavLink>
    </div>
}
const Message=(props:DialogsItemType)=>{
    return <div className={dialogs.item}>{props.name}</div>
}

type DialogsType={
    dialogsPage:{
        dialogs:Array<DialogType>,
        messages:Array<DialogType>,
        newMessageBody:string|null
    },
    sendNewMessageActionCreator:(newMessageBody:string)=>void
}

const Dialogs:React.FC<DialogsType>=(props)=>{
    let dialogsElem=props.dialogsPage.dialogs.map(item=><DialogsItem  name={item.name} id={item.id}/>);
    let messageElem=props.dialogsPage.messages.map(item=><Message name={item.name} id={item.id}/>);

    let addMessage=(value:any)=>{

        props.sendNewMessageActionCreator(value.newMessageBody);
        value.newMessageBody='';
    }

  
    return(
        <div>
            <h1>Dialogs</h1>
            <div className={dialogs.wrapper}>
                <div >
                    <div >
                        {dialogsElem}
                    </div>
                </div>
                <div>
                    <div>
                        {messageElem}
                    </div>
                    <AddMessageFormRedux onSubmit={addMessage}/>
                </div>
            </div>
           
        </div>
    )
}

export default Dialogs;