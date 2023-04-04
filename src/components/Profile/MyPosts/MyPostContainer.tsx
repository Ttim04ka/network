import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppState } from '../../../redux/redux-store';
import MyPost, { IProps } from './MyPost';

let mapStateToProps=(state:AppState)=>{
    return {
        profilePage:state.profileReducer
    }
}
let addPostActionCreator=actions.addPostActionCreator
const MyPostContainer=connect(mapStateToProps,{addPostActionCreator})(MyPost);


export default MyPostContainer;