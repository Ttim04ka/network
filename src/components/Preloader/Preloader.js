import preloader from '../../images/1480.gif'
import React from 'react';
import p from './Preloader.module.css'

const Preloader=(props)=>{
    return <div className={p.preloader}><img src={preloader}></img></div> 
}

export default Preloader