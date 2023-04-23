import React, { Component, FC } from 'react';
import { Field } from 'redux-form';
import { FieldValidatorType } from '../../utils/validations/valid';
import styles from './FormsControls.module.css' 
type FormControlsParamType={
    meta:{
        touched:boolean,
        error:string
    },
    input:any
    props:any
}

export function textAreaAdjust(e:any) {
    e.currentTarget.style.height = "1px";
    e.currentTarget.style.height = (25+e.currentTarget.scrollHeight)+"px";
  }
export const Textarea:React.FC<FormControlsParamType>=({input,meta:{touched,error},...props})=>{
    const hasError=touched && error
    return (
        
        <div className={ hasError ? styles.error:""}>
            <textarea {...input} {...props} className={styles.textarea} onKeyUp={textAreaAdjust}/>
            {touched && error && <span className={styles.error}>{error}</span>}
        </div>
    )
}

export const Input:React.FC<FormControlsParamType>=({input,meta:{touched,error},...props})=>{
    const hasError=touched && error
    return (
        <div className={hasError ? styles.error:""}>
            <input {...input} {...props} className={styles.input}/>
            {touched && error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
export const CheckBox:React.FC<FormControlsParamType>=({input,meta:{touched,error},...props})=>{
    const hasError=touched && error
    return (
        <div className={hasError ? styles.error:""}>
            <input {...input} {...props} className={styles.checkbox}/>
            {touched && error && <span className={styles.error}>{error}</span>}
        </div>
    )
}

export function createField<FormKeysType extends string>(
    placeholder:string|undefined,
    name:FormKeysType,
    validators:Array<FieldValidatorType>,
    component:React.FC<FormControlsParamType>,
    props={},
    text="")
    {
        return <div>
            <Field  placeholder={placeholder} name={name} validators={validators} component={component} {...props}/>
        </div>
}