import React, { useRef, useState } from 'react';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../redux/redux-store';
import { ActionTypes } from '../../redux/users-reducer';
import Preloader from '../Preloader/Preloader';
import MyPostContainer from './MyPosts/MyPostContainer';
import ProfileDataReduxForm from './ProfileDataForm';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {
  UserOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';
import styles from './Profile.module.css'
export type Props={
  profile:any,
  status:string,
  isOwner:any,
  myUserId:number,
  isAuth:boolean,
  photo:string,
  match:{
    params:{
      userId:number
    }
  },

  savePhotoThunkCreator:(photo:string)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  saveProfile:(data:any)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  updateStatusThunkCreator:(data:any)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,

}
const Profile:React.FC<Props>=(props)=>{

    let [editMode,setEditMode]=useState(false);

    if(!props.profile){
      return <Preloader></Preloader>
      
    }
    const selectMainPhohto=(e:any)=>{   
      props.savePhotoThunkCreator(e.target.files[0])
      
    }
    const goToEditMode=()=>{
      setEditMode(true)
    }
    const onSubmit=(formData:any)=>{
      props.saveProfile(formData);
      setEditMode(false);
    }
    return(
      <div>
        {editMode ? <ProfileDataReduxForm {...props} selectMainPhohto={selectMainPhohto} onSubmit={onSubmit}></ProfileDataReduxForm> :<ProfileData {...props} selectMainPhohto={selectMainPhohto}  goToEditMode={goToEditMode}></ProfileData>}
      </div>
    )
  
}

type ProfileDataPropsType={
  selectMainPhohto:(e:any)=>void,
  goToEditMode:()=>void
}
const ProfileData:React.FC<Props & ProfileDataPropsType>=(props)=>{

  return (
  <div className={styles.main_container}>
    <div className={styles.profile_left}>

      {props.isOwner ?
        <>
          {props.photo ? 
          <div className={styles.profile_img_container}><input type='file' title=''  onChange={props.selectMainPhohto} className={styles.profile_img_btn}></input> <img className={styles.add_img} src={props.photo}></img></div> 
          : <div className={styles.profile_img_container}><input type='file' title=''  onChange={props.selectMainPhohto} className={styles.profile_img_btn}></input><Avatar className={styles.profile_img} icon={<UserOutlined />}/></div>}
        </>:
        <>
          <div className={styles.profile_img_container}><img className={styles.profile_img_user} src="https://w7.pngwing.com/pngs/364/361/png-transparent-account-avatar-profile-user-avatars-icon.png" alt="" /></div>
        </>
        
      }
      
      <p className={styles.profile_description}>{props.profile.fullName}</p>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatusThunkCreator} ></ProfileStatusWithHooks>
      <div className={styles.profile_job}>My career: {props.profile.lookingForAJob ? "I'm looking for a job" : "I'm not looking for a job"}</div>
      {props.profile.lookingForAJob ? <div className={styles.profile_job}>My professional skills: {props.profile.lookingForAJobDescription}</div>: "I haven't had professional skills yet"}
      <div className={styles.profile_about}>About me: {props.profile.aboutMe }</div>
      {props.isOwner && <div ><button className={styles.profile_edit} onClick={props.goToEditMode}>edit</button></div>}
   </div>
    <div>
    <MyPostContainer isOwner={props.isOwner}/>
    </div>
  </div>
  
  
  )
}

export default Profile;