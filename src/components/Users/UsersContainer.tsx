import React from 'react';
import Users from './Users';




type UsersPageType={
    
}
export const UsersPage:React.FC<UsersPageType>=React.memo((props)=>{
    return(
        <Users></Users>
    )
})




