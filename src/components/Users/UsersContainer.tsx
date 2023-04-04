import React from 'react';
import { useSelector } from 'react-redux';
import Users from './Users';
import Preloader from '../Preloader/Preloader';
import { getIsFetching} from '../../redux/users-selectors';



type UsersPageType={
    
}
export const UsersPage:React.FC<UsersPageType>=(props)=>{
    const isFetching=useSelector(getIsFetching)
    return<>
        {isFetching ? <Preloader></Preloader>: null}
        <Users></Users>
    </>
}




