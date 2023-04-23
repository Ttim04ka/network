import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppState } from '../redux/redux-store';


let mapStateToPropsForRedirect=(state:AppState)=>{
    return {
        isAuth:state.authReducer.isAuth
    }
}
type IProps={isAuth:boolean}
export function withAuthRedirect<WCP>(Component:React.ComponentType<WCP>){
    function RedirectComponent (props:any){

            if(!props.isAuth) return <Redirect to="/login"></Redirect>
            return <Component {...props}/>
       
    }

    let ConnectedRedirectComponent=connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedRedirectComponent;
}