import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Props } from './Profile';

type IProps={
    updateStatus:(status:string)=>void,
    status:string
}

const ProfileStatusWithHooks:React.FC<IProps>=(props)=>{

    let [editMode,setEditMode]=useState(false);
    let [status,setStatus]=useState(props.status);
    const activateMode=()=>{
        setEditMode(true);
    }
    useEffect(()=>{
        setStatus(props.status);
    },[props.status])
    const disactivateMode=()=>{
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange=(e:any)=>{
        setStatus(e.currentTarget.value)
       
    }

    return(      
       <div>
           {!editMode &&
                <div>
                    <span onDoubleClick={activateMode}>{props.status || "No status"}</span>
                </div>
            } 
            {editMode && 
                <div>
                    <input type="text" value={status} onBlur={disactivateMode} onChange={onStatusChange}/>
                </div>
            }
       </div>
    )
  
}

export default ProfileStatusWithHooks;