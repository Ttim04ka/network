
import React from 'react';
import { reduxForm,Field, InjectedFormProps } from 'redux-form';
import { createField, Input, Textarea } from '../Preloader/FormsControls';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { FormDataType } from '../Login/LoginContainer';

type IProps={
  selectMainPhohto:(e:any)=>void
}

const ProfileDataForm:React.FC<InjectedFormProps<FormDataType,IProps>& IProps>=(props:any)=>{
  return <form onSubmit={props.handleSubmit}>

    <img src={props.photo}></img>
    {props.isOwner && <input type='file' onChange={props.selectMainPhohto}></input>}
    <div><button onClick={()=>{}}>save</button></div>
    <p>description:{createField("Full name",'fullName',[],Input)}</p>
    <div>Looking for a job?:{createField("",'lookingForAJob',[],Input,{type:"checkbox"})}</div>
    <div>My professional skills:{createField("my skills",'lookingForAJobDescription',[],Textarea,)}</div>
    <div><b>About me</b>{createField("about me",'aboutMe',[],Textarea,)}</div>
    
    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatusThunkCreator} ></ProfileStatusWithHooks>
  </form> 
  }
const ProfileDataReduxForm=reduxForm<FormDataType,IProps>({form:'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm