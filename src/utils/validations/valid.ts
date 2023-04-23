export type FieldValidatorType=(value:string)=>string|undefined


export const requiredField:FieldValidatorType=value=>{
    if(value) return undefined;
    return "Field is required"
}
export const maxLengthCreator=(maxLength:number):FieldValidatorType=>value=>{
    if(value && value.length>maxLength) return `Value is ${maxLength}`;
    return undefined;
}

//{Object.keys(props.profile.contacts).map(key=><div><b>{key}</b>:{props.profile.contacts[key]}</div>) }