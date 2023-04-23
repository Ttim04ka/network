import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validations/valid';
import { CheckBox, createField, Input } from '../Preloader/FormsControls';
import { logIn } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from './../Preloader/FormsControls.module.css'
import { AppState } from '../../redux/redux-store';


export type FormDataType={
    email:string,
    password:string,
    rememberMe:boolean,
    captcha:string
}
type IProps={
    captchaURL:string|null
}
export type FormDataTypeKeys=Extract<keyof FormDataType,string>

export const LoginContainer:React.FC=(props)=>{

    const captchaURL=useSelector((state:AppState)=>state.authReducer.captchaURL)
    const isAuth=useSelector((state:AppState)=>state.authReducer.isAuth)

    const dispatch=useDispatch()

    
    const getDataFromForm=(formData:FormDataType)=>{
        
        dispatch(logIn(formData.email,formData.password,formData.rememberMe,formData.captcha));
    }
    if(isAuth===true){
        return <Redirect to='/profile'/>
    }

    return <div>
        <LoginReduxForm onSubmit={getDataFromForm} captchaURL={captchaURL}></LoginReduxForm>
    </div> 
}


const maxLength10=maxLengthCreator(20)




const LoginForm:React.FC<InjectedFormProps<FormDataType,IProps> & IProps>=({handleSubmit,error,captchaURL})=>{

    
    return <div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.item}><span className={styles.text}>Username: </span>{createField<FormDataTypeKeys>("login",'email',[requiredField,maxLength10],Input)}</div>
            <div className={styles.item}><span className={styles.text}>Password: </span><Field component={Input} type="password" placeholder="password" name="password" validate={[requiredField,maxLength10]} text={`input`} /></div>
            <div className={styles.item}><span className={styles.text}></span><Field component={CheckBox}  type="checkbox" placeholder="password" name="rememberMe" /><span className={styles.remember}>Remember me </span></div>
            {captchaURL && <div className={styles.item}><span className={styles.text}></span> <img src={captchaURL} className={styles.captcha_img}></img></div> }
            {captchaURL && <div className={styles.item}><span className={styles.text}></span><Field component={Input}  type="text" placeholder="simbols from image" name="captcha"  validate={[requiredField]}/></div>}
            {error && <div className={styles.summaryError}>{error}</div>}
            <div  className={styles.item}><span className={styles.text}></span><button type="submit" className={styles.btn} >Log in</button></div>
        </form>
    </div> 
}

const LoginReduxForm=reduxForm<FormDataType,IProps>({ // <----- THIS IS THE IMPORTANT PART!
    form: 'login',                           // a unique name for this form
})(LoginForm)
