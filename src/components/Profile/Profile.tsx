import React, { useState } from 'react';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../redux/redux-store';
import { ActionTypes } from '../../redux/users-reducer';
import Preloader from '../Preloader/Preloader';
import MyPostContainer from './MyPosts/MyPostContainer';
import profile from './Profile.module.css'
import ProfileDataReduxForm from './ProfileDataForm';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

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
    debugger
    let [editMode,setEditMode]=useState(false)

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
      
      <div className={profile.main}>
        {editMode ? <ProfileDataReduxForm {...props} selectMainPhohto={selectMainPhohto} onSubmit={onSubmit}></ProfileDataReduxForm> :<ProfileData {...props} selectMainPhohto={selectMainPhohto}  goToEditMode={goToEditMode}></ProfileData>}
        
        <MyPostContainer/>
      </div>
    )
  
}
type ProfileDataPropsType={
  selectMainPhohto:(e:any)=>void,
  goToEditMode:()=>void
}
const ProfileData:React.FC<Props & ProfileDataPropsType>=(props)=>{
  
  
 
  
  return <div>
  <img src={props.photo}></img>
  {props.isOwner && <input type='file' onChange={props.selectMainPhohto}></input>}
  {props.isOwner && <div><button onClick={props.goToEditMode}>edit</button></div>}
  <p>description:{props.profile.fullName}</p>
  <div>Looking for a job?:{props.profile.lookingForAJob ? "yes" : "no"}</div>
  {props.profile.lookingForAJob && <div>My professional skills:{props.profile.lookingForAJobDescription}</div>}
  <div><b>About me</b> {props.profile.aboutMe }</div>
  <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatusThunkCreator} ></ProfileStatusWithHooks>
</div>
}

export default Profile;