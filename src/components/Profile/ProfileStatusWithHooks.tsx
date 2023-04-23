import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Profile.module.css'
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
                <div className={styles.profile_status_container}>
                   <i>
                    <span className={styles.profile_status} onDoubleClick={activateMode}>{props.status || "No status"}</span>
                   </i> 
                </div>
            } 
            {editMode && 
                <div className={styles.profile_status_container}>
                    <input className={styles.profile_status_input}  value={status} onBlur={disactivateMode} onChange={onStatusChange} maxLength={22}/>
                </div>
            }
       </div>
    )
  
}

export default ProfileStatusWithHooks;