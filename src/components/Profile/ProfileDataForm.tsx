
import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { CheckBox, createField, Input, Textarea } from '../Preloader/FormsControls';
import { FormDataType } from '../Login/LoginContainer';
import styles from './Profile.module.css'
type IProps={
  selectMainPhohto:(e:any)=>void
}

const ProfileDataForm:React.FC<InjectedFormProps<FormDataType,IProps>& IProps>=(props:any)=>{
  return(
  <form onSubmit={props.handleSubmit} className={styles.editForm}>
    
    <p><span className={styles.form_text}>Description:</span>{createField("Full name",'fullName',[],Input)}</p>
    <div className={styles.form_name}><span className={styles.form_name_title}> Looking for a job?</span> {createField("",'lookingForAJob',[],CheckBox,{type:"checkbox"})}</div>
    <div><span className={styles.form_text}>My professional skills:</span>{createField("I'm programming realy fast...",'lookingForAJobDescription',[],Textarea,)}</div>
    <div><span className={styles.form_text}>About me:</span>{createField("for instance, I'm a doctor...",'aboutMe',[],Textarea,)}</div>
    <span className={styles.form_text}>*Обязательно заполните все поля формы</span>
    <div><button className={styles.profile_edit} onClick={()=>{}}>save</button></div>
  </form> 
  )}
const ProfileDataReduxForm=reduxForm<FormDataType,IProps>({form:'edit-profile'})(ProfileDataForm)
export default ProfileDataReduxForm