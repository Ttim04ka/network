
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import  { FilterStateType, followThunkCreator, getUserThunkCreator,  unfollowThunkCreator }  from '../../redux/users-reducer';
import { getCurrentPage, getDisabledBtn, getFilter, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Paginator from './Paginator';
import u from './Users.module.css'
import * as queryString from 'querystring'
type Props={
    portionSize?:number 
}
let Users:React.FC<Props>=(props)=>{


    const disable=useSelector(getDisabledBtn)
    const users=useSelector(getUsers)
    const filter=useSelector(getFilter)
    const totalUsersCount=useSelector(getTotalUsersCount)
    const pageSize=useSelector(getPageSize)
    const currentPage=useSelector(getCurrentPage)
    
    const dispatch=useDispatch()

    const unfollowThunk=(id:number)=>{dispatch(unfollowThunkCreator(id))}
    const followThunk=(id:number)=>{dispatch(followThunkCreator(id))}
    const history=useHistory()
   
    useEffect(()=>{
        const parsed=queryString.parse(history.location.search.substr(1))

        let actualPage=currentPage;
        let actualFilter=filter;

        if(parsed.page) actualPage=Number(parsed.page)
        if(parsed.term) actualFilter={...actualFilter,term:parsed.term as string}
        if(parsed.friend) actualFilter={...actualFilter,friend:parsed.friend==="null" ? null : parsed.friend==="true" ? true : false }
        dispatch(getUserThunkCreator(actualPage,pageSize,actualFilter))
    },[])
    useEffect(()=>{
        const query:any={}
        if(currentPage!==1) query.page=currentPage
        if(filter.term) query.term=filter.term
        if(filter.friend!==null) query.friend=String(filter.friend)
        history.push({
            pathname:'/users',
            search:queryString.stringify(query)
        })
    },[currentPage,filter])

        
    const  onPageChanged=(pageNumber:number,filter:FilterStateType)=>{
        dispatch(getUserThunkCreator(pageNumber,pageSize,filter))
    }


    const onFilterChanged=(filter:FilterStateType)=>{
        dispatch(getUserThunkCreator(currentPage,pageSize,filter))
    }

    return <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}></UsersSearchForm>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} filter={filter}></Paginator>
            {users.map(users=><div className={u.flex} key={users.id}>
                <span >
                    <div>
                        <NavLink to={'/profile/'+ users.id}>
                            <img src={users.photoUrl!=null ? users.photoUrl : "http://avotarov.ru/picture/avatar-100/kartinki/924.jpg" } alt="" />
                        </NavLink>
                       
                    </div>
                    <div>
                        {users.followed 
                        ? <button disabled={disable.some(id=>id===users.id)} onClick={
                            ()=>{
                               unfollowThunk(users.id);
                            }
                        }>Unfollow</button> 
                        : <button disabled={disable.some(id=>id===users.id)} onClick={
                            ()=>{
                                followThunk(users.id);
                            }
                        }>Follow</button>}
                        
                    </div>
                </span>
                <span>
                    <span>
                        <div>{users.name}</div>
                        <div>{users.status}</div>
                    </span>
                    <span>
                        <div>{"users.location.city"}</div>
                        <div>{"users.location.country"}</div>
                    </span>
                </span>
                
            </div>)}
        </div>
}






export default Users


type UsersSearchFormType={
    onFilterChanged:(filter:FilterStateType)=>void
}
export const UsersSearchForm:React.FC<UsersSearchFormType>=React.memo((props)=>{
    const filter=useSelector(getFilter)
    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{term:filter.term,friend:filter.friend}}
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={(values:FilterStateType, { setSubmitting }) => {
                props.onFilterChanged(values)

                setSubmitting(false)
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                <Field type="text" name="term" />
                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Only followed</option>
                    <option value="false">Only unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
     </Formik>
    </div>
})
