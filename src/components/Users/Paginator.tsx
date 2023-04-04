
import React, { useState } from 'react';
import { FilterStateType } from '../../redux/users-reducer';
import u from './Users.module.css'

type Props={
    totalUsersCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(page:number,filter:FilterStateType)=>void
    portionSize?:number
    filter:FilterStateType
}

let Paginator:React.FC<Props>=(props)=>{
    let pagesCount=Math.ceil(props.totalUsersCount/props.pageSize)
    let pages=[];
    for (let i = 1; i <=pagesCount; i++) {
        pages.push(i);
        
    }
    let portionSize=5;
    let portionCount=Math.ceil(pagesCount/portionSize);
    let [portionNumber,setPortionNumber]=useState(1);
    let leftBorder=(portionNumber-1)*portionSize+1;
    let rightBorder=portionNumber*portionSize;
    return <div style={{display:'flex'}}>
        {portionNumber>1 &&
        <button onClick={()=>{setPortionNumber(portionNumber-1);}}> PREV </button>}
        <div className={u.choice}>
            {pages
            .filter(p=>p>=leftBorder && p<=rightBorder)
            .map(page=>{
                return <span className={props.currentPage===page ? u.pages: ""} onClick={()=>{props.onPageChanged(page,props.filter)}} >{page}</span>
            })}
        </div>
        {portionCount>portionNumber &&
        <button onClick={()=>{setPortionNumber(portionNumber+1)}}>NEXT</button>}
    </div>
}

export default Paginator