
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import { AppState } from '../../redux/redux-store.js';
import Dialogs from './Dialogs';


let mapStateToProps=(state:AppState)=>{
    return {
        dialogsPage:state.dialogsReducer,
        isAuth:state.authReducer.isAuth
    }
}







type IProps={
    store:any
}

export default compose(
    connect(mapStateToProps,{...actions}),
    withAuthRedirect
)(Dialogs) as React.ComponentType<IProps>;