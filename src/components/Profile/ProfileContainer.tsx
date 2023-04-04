
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserThunkCreator,getStatusThunkCreator,updateStatusThunkCreator,savePhotoThunkCreator,saveProfile} from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../redux/redux-store';
import { ActionTypes } from '../../redux/profile-reducer';
import {actions} from '../../redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/AuthRedirect';


type MapStateToPropsType={
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
  }
}
type MapDispatchToPropsType={
  updatePhoto:(data:any)=>void,
  setUserThunkCreator:(userId:number)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  getStatusThunkCreator:(userId:number)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  savePhotoThunkCreator:(photo:string)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  saveProfile:(data:any)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
  updateStatusThunkCreator:(data:any)=>(dispatch:any)=>ThunkAction<void,AppState,unknown,ActionTypes>,
}




class ProfileContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType>{
  refresh(){
    let userId=this.props.match.params.userId;
    if(userId!==this.props.myUserId){
     
      actions.updatePhoto('https://sun9-20.userapi.com/impg/6iSbu-qbkquC1-UzQ-RiLVbR7OYKcN8FQjGa-g/PW5QDnxrMjs.jpg?size=960x1280&quality=96&sign=1d561119e23872d9bc39386e5d3cbffd&type=album')
    }
    if(!userId){
      if(this.props.isAuth){
        userId=this.props.myUserId;
    }}
    else{
      actions.updatePhoto( "http://avotarov.ru/picture/avatar-100/kartinki/924.jpg")
    }
    debugger
   
    this.props.setUserThunkCreator(userId);
    this.props.getStatusThunkCreator(userId);
  }
  
  componentDidMount(){
    debugger
    this.refresh()
  }
  componentDidUpdate(prevProps:any) {

    if(this.props.match.params.userId!==prevProps.match.params.userId){
      this.props.updatePhoto( "http://avotarov.ru/picture/avatar-100/kartinki/924.jpg")
      this.refresh()
      
    }
   
    
  
  }
  render(){
    
    return(
      <div >
         <Profile {...this.props} isOwner={!this.props.match.params.userId} ></Profile>
      </div>
    )
  }
    
}

let mapStateToProps=(state:AppState)=>({
  
  profile:state.profileReducer.profile,
  status:state.profileReducer.status,
  myUserId:state.authReducer.userId,
  isAuth:state.authReducer.isAuth,
  photo:state.profileReducer.photoURL
});



type IProps={
  store:any
}
export default compose<React.ComponentType<IProps>>(
  connect(mapStateToProps,{setUserThunkCreator,getStatusThunkCreator,updateStatusThunkCreator,savePhotoThunkCreator,saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);